import { StargateChains } from "../src/types";
export const chainData: Record<StargateChains, any> = {
	[StargateChains.ETH]: {
		rpc: "https://endpoints.omniatech.io/v1/eth/mainnet/public",
		explorer: "https://etherscan.io",
		id: 1,
		dstChainId: 101,
		stargateContract: "0x8731d54E9D02c286767d56ac03e8037C07e01e98",
		stargateETHContract: "0x150f94B44927F078737562f0fcF3C95c01Cc2376",
	},
	[StargateChains.BSC]: {
		rpc: "https://rpc.ankr.com/bsc",
		explorer: "https://bscscan.com",
		id: 56,
		dstChainId: 102,
		stargateContract: "0x4a364f8c717caad9a442737eb7b8a55cc6cf18d8",
	},
	[StargateChains.Arbitrum]: {
		rpc: "https://endpoints.omniatech.io/v1/arbitrum/one/public",
		explorer: "https://arbiscan.io",
		id: 42161,
		dstChainId: 110,
		stargateContract: "0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614",
		stargateETHContract: "0xbf22f0f184bCcbeA268dF387a49fF5238dD23E40",
	},
	[StargateChains.Avalanche]: {
		rpc: "https://avalanche-c-chain.publicnode.com",
		explorer: "https://snowtrace.io",
		id: 43114,
		dstChainId: 106,
		stargateContract: "0x45a01e4e04f14f7a4a6702c74187c5f6222033cd",
	},
	[StargateChains.Optimism]: {
		rpc: "https://endpoints.omniatech.io/v1/op/mainnet/public",
		explorer: "https://optimistic.etherscan.io",
		id: 10,
		dstChainId: 111,
		stargateContract: "0xB0D502E938ed5f4df2E681fE6E419ff29631d62b",
		stargateETHContract: "0xB49c4e680174E331CB0A7fF3Ab58afC9738d5F8b",
	},
	[StargateChains.Polygon]: {
		rpc: "https://endpoints.omniatech.io/v1/matic/mainnet/public",
		explorer: "https://polygonscan.com",
		id: 137,
		dstChainId: 109,
		stargateContract: "0x45A01E4e04F14f7A4a6702c74187c5F6222033cd",
	},
};
