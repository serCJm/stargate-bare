export enum StargateChains {
	Polygon = "polygon",
	Optimism = "optimism",
	BSC = "bsc",
	Arbitrum = "arbitrum",
	Avalanche = "avalanche",
	ETH = "ethereum",
}

export type TokenData = {
	symbol: string;
	contract: string;
	decimals: number;
	srcPoolId: number;
	supportedRoutes: string[];
};

export type StargateChainsTokens = {
	[key: string]: TokenData;
};

export type ChainData = {
	rpc: string;
	explorer: string;
	id: number;
	dstChainId: number;
	stargateContract: string;
	stargateETHContract?: string;
};

type GasFees = {
	maxPriorityFee: number;
	maxFee: number;
};

export type GasInfoResponse = {
	safeLow: GasFees;
	standard: GasFees;
	fast: GasFees;
	estimatedBaseFee: number;
	blockTime: number;
	blockNumber: number;
};

export type EstimateGasReturnProps = {
	gasLimit?: bigint;
	maxPriorityFeePerGas?: bigint;
	maxFeePerGas?: bigint;
	gasPrice?: bigint;
};
