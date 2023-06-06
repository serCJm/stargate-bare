import { ChainData, TokenData } from "../types";

export function validate(
	fromChain: string,
	fromToken: string,
	fromChainData: ChainData,
	fromTokenData: TokenData,
	toChain: string,
	toToken: string,
	toChainData: ChainData,
	toTokenData: TokenData
) {
	if (!fromChainData || !toChainData)
		throw new Error(`Unsupported chain ${fromChain}`);
	if (!fromTokenData || !toTokenData)
		throw new Error(`Unsupported token ${fromToken} on chain ${fromChain}`);

	const isRouteSupported: boolean = fromTokenData.supportedRoutes.some(
		(item: string) => {
			return (
				item.toLowerCase().includes(toChain) && item.includes(toToken)
			);
		}
	);
	if (!isRouteSupported)
		throw new Error(
			"Swap route is not supported. Change destination chain or token. |Check: https://stargateprotocol.gitbook.io/stargate/developers/stargate-chain-paths"
		);
}

export function validateETH(
	fromChain: string,
	fromToken: string,
	fromChainData: ChainData,
	toChain: string,
	toToken: string,
	toChainData: ChainData
) {
	if (
		(fromToken === "ETH" && toToken !== "ETH") ||
		(toToken === "ETH" && fromToken !== "ETH")
	)
		throw new Error("Can only swap ETH to ETH");
	if (!fromChainData.stargateETHContract || !toChainData.stargateETHContract)
		throw new Error(
			`ETH swap is not supported between chains ${fromChain} and ${toChain}`
		);
}
