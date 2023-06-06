import { StargateChains, StargateChainsTokens } from "../src/types";

export const tokenData: Record<StargateChains, StargateChainsTokens> = {
	[StargateChains.ETH]: {
		USDC: {
			symbol: "USDC",
			contract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			decimals: 6,
			srcPoolId: 1,
			supportedRoutes: [
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"ARBITRUM-USDC",
				"ARBITRUM-USDT",
				"OPTIMISM-USDC",
				"FANTOM-USDC",
			],
		},
		USDT: {
			symbol: "USDT",
			contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
			decimals: 6,
			srcPoolId: 2,
			supportedRoutes: [
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"ARBITRUM-USDC",
				"ARBITRUM-USDT",
				"OPTIMISM-USDC",
				"FANTOM-USDC",
			],
		},
		USDD: {
			symbol: "USDD",
			contract: "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6",
			decimals: 18,
			srcPoolId: 11,
			supportedRoutes: ["BSC-USDD"],
		},
		DAI: {
			symbol: "DAI",
			contract: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
			decimals: 18,
			srcPoolId: 3,
			supportedRoutes: ["POLYGON-DAI", "OPTIMISM-DAI"],
		},
		FRAX: {
			symbol: "FRAX",
			contract: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
			decimals: 18,
			srcPoolId: 7,
			supportedRoutes: [
				"AVALANCHE-FRAX",
				"ARBITRUM-FRAX",
				"OPTIMISM-FRAX",
			],
		},
		sUSD: {
			symbol: "sUSD",
			contract: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
			decimals: 18,
			srcPoolId: 14,
			supportedRoutes: ["OPTIMISM-SUSD"],
		},
		LUSD: {
			symbol: "LUSD",
			contract: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
			decimals: 18,
			srcPoolId: 15,
			supportedRoutes: ["ARBITRUM-LUSD", "OPTIMISM-LUSD"],
		},
		Metis: {
			symbol: "Metis",
			contract: "0x9e32b13ce7f2e80a01932b42553652e053d6ed8e",
			decimals: 18,
			srcPoolId: 17,
			supportedRoutes: ["BSC-METIS", "METIS-METIS"],
		},
	},
	[StargateChains.BSC]: {
		USDT: {
			symbol: "USDT",
			contract: "0x55d398326f99059fF775485246999027B3197955",
			decimals: 18,
			srcPoolId: 2,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"ARBITRUM-USDC",
				"OPTIMISM-USDC",
				"ARBITRUM-USDT",
				"FANTOM-USDC",
			],
		},
		BUSD: {
			symbol: "BUSD",
			contract: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
			decimals: 18,
			srcPoolId: 5,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"ARBITRUM-USDC",
				"OPTIMISM-USDC",
				"ARBITRUM-USDT",
				"FANTOM-USDC",
			],
		},
		USDD: {
			symbol: "USDD",
			contract: "0xd17479997F34dd9156Deef8F95A52D81D265be9c",
			decimals: 18,
			srcPoolId: 11,
			supportedRoutes: ["ETHEREUM-USDD"],
		},
		Metis: {
			symbol: "Metis",
			contract: "0xe552Fb52a4F19e44ef5A967632DBc320B0820639",
			decimals: 18,
			srcPoolId: 17,
			supportedRoutes: ["ETHEREUM-METIS", "METIS-METIS"],
		},
	},
	[StargateChains.Arbitrum]: {
		USDC: {
			symbol: "USDC",
			contract: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
			decimals: 6,
			srcPoolId: 1,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"OPTIMISM-USDC",
				"FANTOM-USDC",
			],
		},
		USDT: {
			symbol: "USDT",
			contract: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
			decimals: 6,
			srcPoolId: 2,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"OPTIMISM-USDC",
				"FANTOM-USDC",
			],
		},
		FRAX: {
			symbol: "FRAX",
			contract: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
			decimals: 18,
			srcPoolId: 7,
			supportedRoutes: [
				"ETHEREUM-FRAX",
				"AVALANCHE-FRAX",
				"OPTIMISM-FRAX",
			],
		},
	},
	[StargateChains.Avalanche]: {
		USDC: {
			symbol: "USDC",
			contract: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
			decimals: 6,
			srcPoolId: 1,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"ARBITRUM-USDC",
				"ARBITRUM-USDT",
				"OPTIMISM-USDC",
				"FANTOM-USDC",
			],
		},
		USDT: {
			symbol: "USDT",
			contract: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
			decimals: 6,
			srcPoolId: 2,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"ARBITRUM-USDC",
				"ARBITRUM-USDT",
				"OPTIMISM-USDC",
				"FANTOM-USDC",
			],
		},
		FRAX: {
			symbol: "FRAX",
			contract: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
			decimals: 18,
			srcPoolId: 7,
			supportedRoutes: [
				"ETHEREUM-FRAX",
				"ARBITRUM-FRAX",
				"OPTIMISM-FRAX",
			],
		},
	},

	[StargateChains.Optimism]: {
		USDC: {
			symbol: "USDC",
			contract: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
			decimals: 6,
			srcPoolId: 1,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"POLYGON-USDC",
				"POLYGON-USDT",
				"ARBITRUM-USDC",
				"ARBITRUM-USDT",
				"FANTOM-USDC",
			],
		},
		DAI: {
			symbol: "DAI",
			contract: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
			decimals: 18,
			srcPoolId: 3,
			supportedRoutes: ["ETHEREUM-DAI", "POLYGON-DAI"],
		},
		FRAX: {
			symbol: "FRAX",
			contract: "0x2E3D870790dC77A83DD1d18184Acc7439A53f475",
			decimals: 18,
			srcPoolId: 7,
			supportedRoutes: [
				"ETHEREUM-FRAX",
				"AVALANCHE-FRAX",
				"ARBITRUM-FRAX",
			],
		},
		sUSD: {
			symbol: "sUSD",
			contract: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
			decimals: 18,
			srcPoolId: 14,
			supportedRoutes: ["ETHEREUM-SUSD"],
		},
		LUSD: {
			symbol: "LUSD",
			contract: "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819",
			decimals: 18,
			srcPoolId: 15,
			supportedRoutes: ["ETHEREUM-LUSD", "ARBITRUM-LUSD"],
		},
	},
	[StargateChains.Polygon]: {
		USDC: {
			symbol: "USDC",
			contract: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
			decimals: 6,
			srcPoolId: 1,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"ARBITRUM-USDC",
				"ARBITRUM-USDT",
				"OPTIMISM-USDC",
				"FANTOM-USDC",
			],
		},
		USDT: {
			symbol: "USDT",
			contract: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
			decimals: 6,
			srcPoolId: 2,
			supportedRoutes: [
				"ETHEREUM-USDC",
				"ETHEREUM-USDT",
				"BSC-BUSD",
				"BSC-USDT",
				"AVALANCHE-USDC",
				"AVALANCHE-USDT",
				"ARBITRUM-USDC",
				"ARBITRUM-USDT",
				"OPTIMISM-USDC",
				"FANTOM-USDC",
			],
		},
		DAI: {
			symbol: "DAI",
			contract: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
			decimals: 18,
			srcPoolId: 3,
			supportedRoutes: ["ETHEREUM-DAI", "OPTIMISM-DAI"],
		},
	},
};