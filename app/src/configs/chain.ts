import {
	arbitrum,
	arbitrumGoerli,
	avalanche,
	avalancheFuji,
	bsc,
	bscTestnet,
	fantom,
	fantomTestnet,
	foundry,
	goerli,
	hardhat,
	localhost,
	mainnet,
	optimism,
	optimismGoerli,
	polygon,
	polygonMumbai,
	sepolia,
} from "wagmi/chains";

export const ChainId = Number(
	process.env.NEXT_PUBLIC_CHAIN_ID ? process.env.NEXT_PUBLIC_CHAIN_ID : 0,
);

export const Chains =
	process.env.NODE_ENV === "production"
		? [
				mainnet,
				avalanche,
				polygon,
				bsc,
				fantom,
				foundry,
				optimism,
				arbitrum,
				/*for testing*/ polygonMumbai,
		  ]
		: [
				localhost,
				hardhat,
				mainnet,
				avalanche,
				foundry,
				avalancheFuji,
				goerli,
				sepolia,
				polygon,
				polygonMumbai,
				bsc,
				bscTestnet,
				fantom,
				fantomTestnet,
				optimism,
				optimismGoerli,
				arbitrum,
				arbitrumGoerli,
		  ];
