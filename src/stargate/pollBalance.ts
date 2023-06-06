import { ethers } from "ethers";
import { setTimeout } from "timers/promises";
import { tokenABI } from "./tokenABI";

const POLL_DELAY = 120000;

type PollBalanceArgs =
	| {
			providerUrl: string;
			walletAddress: string;
			networkName: string;
			tokenContractAddress?: never;
			decimals?: never;
	  }
	| {
			providerUrl: string;
			walletAddress: string;
			networkName: string;
			tokenContractAddress: string;
			decimals: number;
	  };

async function pollUntilBalanceIncreases(
	getBalance: () => Promise<bigint>,
	format: (balance: bigint) => string
) {
	let startBalance = await getBalance();
	while (true) {
		const balance = await getBalance();
		console.info(`Balance on destination chain: ${format(balance)}`);
		if (balance > startBalance) {
			break;
		}
		console.warn(`Retry poll in ${POLL_DELAY / 1000}sec...`);
		await setTimeout(POLL_DELAY);
	}
}

export async function pollBalance({
	providerUrl,
	walletAddress,
	networkName,
	tokenContractAddress,
	decimals,
}: PollBalanceArgs) {
	try {
		console.info(`Polling destination balance...`);
		const providerDestination = new ethers.JsonRpcProvider(providerUrl);

		if (!tokenContractAddress) {
			await pollUntilBalanceIncreases(
				() => providerDestination.getBalance(walletAddress),
				(balance) => ethers.formatEther(balance)
			);
		} else {
			const tokenContractDestination = new ethers.Contract(
				tokenContractAddress,
				tokenABI,
				providerDestination
			);
			await pollUntilBalanceIncreases(
				() => tokenContractDestination.balanceOf(walletAddress),
				(balance) => ethers.formatUnits(balance, decimals)
			);
		}
		console.info(`Balance arrived to ${networkName}`);
	} catch (err) {
		console.error(`Error in pollBalance: ${err}`);
	}
}
