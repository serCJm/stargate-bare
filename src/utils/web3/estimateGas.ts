import { Contract, parseUnits, Provider } from "ethers";
import got from "got";
import { EstimateGasReturnProps, GasInfoResponse } from "../../types";

const MATIC_GAS_INFO = await got.get<GasInfoResponse>(
	"https://gasstation-mainnet.matic.network/v2",
	{
		responseType: "json",
	}
);

export async function estimateGas(
	provider: Provider,
	contract: Contract,
	methodName: string,
	...args: any[]
): Promise<EstimateGasReturnProps> {
	try {
		const block = await provider.getBlock("latest");
		const network = await provider.getNetwork();

		const baseFee = block?.baseFeePerGas;
		if (!baseFee) {
			console.warn`Can't obtain Base Fee on ${network.name}`;
		}

		const feeData = await provider.getFeeData();

		let gasPrice;
		let maxPriorityFeePerGas = feeData.maxPriorityFeePerGas || undefined;

		if (network.name === "matic") {
			maxPriorityFeePerGas = parseUnits(
				Math.ceil(MATIC_GAS_INFO.body.fast.maxPriorityFee).toString(),
				"gwei"
			);
		} else if (network.name === "bnb") {
			gasPrice = parseUnits("1", "gwei");
		}
		if (!maxPriorityFeePerGas) {
			console.warn`Can't obtain Max Priority Fee Per Gas`;
		}

		let maxFeePerGas;
		if (baseFee && maxPriorityFeePerGas)
			maxFeePerGas = baseFee + maxPriorityFeePerGas;

		const gasLimit =
			(await contract[methodName].estimateGas(...args)) + BigInt(10000);

		return {
			...(gasLimit !== undefined && { gasLimit }),
			...(maxPriorityFeePerGas !== undefined && { maxPriorityFeePerGas }),
			...(maxFeePerGas !== undefined && { maxFeePerGas }),
			...(gasPrice !== undefined && { gasPrice }),
		};
	} catch (err) {
		console.error`Error in estimateGas: ${err}`;
		return {};
	}
}
