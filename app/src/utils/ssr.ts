import {EvmChain} from "@moralisweb3/evm-utils";
import {getCookie} from "cookies-next";
import Moralis from "moralis";
import {getSession} from "next-auth/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import {PropsDataType} from "@app/enums";
import {GenericObject, TUserData} from "@app/types";
import {ChainId} from "@configs/chain";

export const getServerSidePropsSession = async function (entities: PropsDataType[] = [], context) {
	const {id} = context.query || {};
	const session = await getSession(context);
	const address = (session?.user as TUserData)?.address;
	const chain = Number(getCookie("chain") || ChainId);

	const data: GenericObject = {};
	await Moralis.start({apiKey: process.env.MORALIS_API_KEY});

	if (entities.includes("userNFTs")) {
		const result = await Moralis.EvmApi.nft.getWalletNFTs({
			chain: EvmChain.create(chain),
			address: address,
		});
		data.userNFTs = result.raw.result;
	}
	if (entities.includes("userTransfersERC20")) {
		const result = await Moralis.EvmApi.nft.getWalletNFTTransfers({
			chain: EvmChain.create(chain),
			address: address,
		});
		data.userTransfersERC20 = result.raw.result;
	}
	if (entities.includes("accountNFTs")) {
		const result = await Moralis.EvmApi.nft.getWalletNFTs({
			chain: EvmChain.create(chain),
			address: id,
		});
		data.accountsNFTs = {
			[id]: result.raw.result,
		};
	}
	if (entities.includes("accountTransfersERC20")) {
		const result = await Moralis.EvmApi.nft.getWalletNFTTransfers({
			chain: EvmChain.create(chain),
			address: id,
		});
		data.accountsTransfersERC20 = {
			[id]: result.raw.result,
		};
	}

	const props: GenericObject = {
		...(await serverSideTranslations(context.locale, ["common", "error"])),
		data,
	};

	return {
		props,
	};
};

export const getServerSidePropsHandler = (entities: string[] = []) => {
	return getServerSidePropsSession.bind(this, entities);
};

export async function getStaticPropsLocale({locale, ...otherProps}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "error"])),
			...otherProps,
		},
	};
}
