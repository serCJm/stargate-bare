import { Contract, Provider, Wallet, ethers } from "ethers";
import { chainData } from "../../data/chain-data";
import { tokenData } from "../../data/tokens-data";
import { ChainData, StargateChains, TokenData } from "../types";
import { estimateGas } from "../utils/web3/estimateGas";
import { pollBalance } from "../utils/web3/pollBalance";
import { stargateABI } from "./ABIs/stargateABI";
import { stargateETHABI } from "./ABIs/stargateETHABI";
import { tokenABI } from "./ABIs/tokenABI";
import { validate, validateETH } from "./validate";

const SLIPPAGE = BigInt(5); // 0.5% slippage

type StargateBridgeArgs = {
	privateKey: string;
	fromChain: StargateChains;
	fromToken: string;
	amount: string;
	toChain: StargateChains;
	toToken: string;
};

export async function stargateBridge({
	privateKey,
	fromChain,
	fromToken,
	amount,
	toChain,
	toToken,
}: StargateBridgeArgs) {
	try {
		console.info`Starting stargateBridge...`;

		const fromChainData: ChainData = chainData[fromChain];
		const toChainData: ChainData = chainData[toChain];

		const fromTokenData: TokenData = tokenData[fromChain][fromToken];
		const toTokenData: TokenData = tokenData[toChain][toToken];

		const provider = new ethers.JsonRpcProvider(fromChainData.rpc);
		const signer = new ethers.Wallet(privateKey, provider);

		const bridgeContractAddress = fromChainData.stargateContract;
		const bridgeContract = new ethers.Contract(
			bridgeContractAddress,
			stargateABI,
			signer
		);

		let hash;
		if (fromToken === "ETH" || toToken === "ETH") {
			validateETH(
				fromChain,
				fromToken,
				fromChainData,
				toChain,
				toToken,
				toChainData
			);
			hash = await swapETH(
				provider,
				signer,
				fromChainData,
				bridgeContract,
				amount,
				toChainData
			);
			console.info`Tx success: ${fromChainData.explorer}/tx/${hash}`;
			await pollBalance({
				providerUrl: toChainData.rpc,
				walletAddress: signer.address,
				networkName: toChain,
			});
		} else {
			validate(
				fromChain,
				fromToken,
				fromChainData,
				fromTokenData,
				toChain,
				toToken,
				toChainData,
				toTokenData
			);
			hash = await swapToken(
				provider,
				signer,
				bridgeContract,
				bridgeContractAddress,
				fromTokenData,
				amount,
				toChainData,
				toTokenData
			);
			console.info`Tx success: ${fromChainData.explorer}/tx/${hash}`;
			await pollBalance({
				providerUrl: toChainData.rpc,
				walletAddress: signer.address,
				networkName: toChain,
				tokenContractAddress: toTokenData.contract,
				decimals: toTokenData.decimals,
			});
		}

		console.info`Congrats! Funds arrived at the destination: ${toChainData.explorer}/address/${signer.address}`;
	} catch (err) {
		console.error`Error in stargateBridge: ${err}`;
		throw err;
	}
}

async function swapToken(
	provider: Provider,
	signer: Wallet,
	bridgeContract: Contract,
	bridgeContractAddress: string,
	fromTokenData: TokenData,
	amount: string,
	toChainData: ChainData,
	toTokenData: TokenData
) {
	const tokenContract = new ethers.Contract(
		fromTokenData.contract,
		tokenABI,
		signer
	);

	const amountToSend: bigint = ethers.parseUnits(
		amount,
		fromTokenData.decimals
	);
	const balance: bigint = await tokenContract.balanceOf(signer.address);

	if (amountToSend > balance)
		throw new Error(`Insufficient balance for: ${fromTokenData.symbol}`);

	const allowance = await tokenContract.allowance(
		signer.address,
		bridgeContractAddress
	);

	if (allowance < amountToSend) {
		let gasEstimate = await estimateGas(
			provider,
			tokenContract,
			"approve",
			bridgeContractAddress,
			amountToSend
		);

		const approvalTx = await tokenContract.approve(
			bridgeContractAddress,
			amountToSend,
			gasEstimate
		);

		await approvalTx.wait(4);
	}

	const amountOutMin =
		(amountToSend * (BigInt(1000) - SLIPPAGE)) / BigInt(1000);

	const txData = "0x";

	const lzTxParams = {
		dstGasForCall: 0,
		dstNativeAmount: 0,
		dstNativeAddr: "0x",
	};

	const fees = await bridgeContract.quoteLayerZeroFee(
		toChainData.dstChainId,
		1,
		toTokenData.contract,
		txData,
		lzTxParams
	);
	const fee = fees[0];

	const bridgeArgs = [
		toChainData.dstChainId,
		fromTokenData.srcPoolId,
		toTokenData.srcPoolId,
		signer.address,
		amountToSend,
		amountOutMin,
		lzTxParams,
		signer.address,
		txData,
		{
			value: fee,
		},
	];

	let txOptions: any = {
		value: fee,
	};

	const gasEstimate = await estimateGas(
		provider,
		bridgeContract,
		"swap",
		...bridgeArgs
	);

	const bridgeTx = await bridgeContract.swap(...bridgeArgs.slice(0, -1), {
		...txOptions,
		...gasEstimate,
	});

	await bridgeTx.wait(2);

	return bridgeTx.hash;
}

async function swapETH(
	provider: Provider,
	signer: Wallet,
	fromChainData: ChainData,
	bridgeContract: Contract,
	amount: string,
	toChainData: ChainData
) {
	const bridgeETHContractAddress = fromChainData.stargateETHContract!;
	const bridgeETHContract = new ethers.Contract(
		bridgeETHContractAddress,
		stargateETHABI,
		signer
	);

	const lzTxParams = {
		dstGasForCall: 0,
		dstNativeAmount: 0,
		dstNativeAddr: signer.address,
	};

	const txData = "0x";

	const fees = await bridgeContract.quoteLayerZeroFee(
		toChainData.dstChainId,
		1,
		signer.address,
		txData,
		lzTxParams
	);
	const fee = fees[0];

	const amountLD: bigint = ethers.parseEther(amount);
	const balance: bigint = await provider.getBalance(signer.address);

	const amountToSend = amountLD + fee;

	if (amountToSend > balance)
		throw new Error(`Insufficient Native balance on origin chain`);

	const amountOutMin = (amountLD * (BigInt(1000) - SLIPPAGE)) / BigInt(1000);

	const ethBridgeArgs = [
		toChainData.dstChainId,
		signer.address,
		signer.address,
		amountLD,
		amountOutMin,
	];

	let txOptions: any = {
		value: amountToSend,
	};

	const bridgeTx = await bridgeETHContract.swapETH(...ethBridgeArgs, {
		...txOptions,
	});

	await bridgeTx.wait(2);

	return bridgeTx.hash;
}
