import {getCookie} from "cookies-next";
import {getSession} from "next-auth/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import {PropsDataType} from "@app/enums";
import {GenericObject, TUserData} from "@app/types";
import {ChainId} from "@configs/chain";
import {getWalletNFTs, getWalletNFTTransfers} from "@services/api";
import {cleanEmpty} from "@utils/objects";

export const getServerSidePropsSession = async function (entities: PropsDataType[] = [], context) {
	const {id} = context.query || {};
	const session = await getSession(context);
	const address = (session?.user as TUserData)?.address;
	const chain = Number(getCookie("chain") || ChainId);

	const data: GenericObject = {accountsNFTs: {}, accountsTransfersERC20: {}};

	if (entities.includes("userNFTs")) {
		data.userNFTs = await getWalletNFTs(chain, address);
	}
	if (entities.includes("userTransfersERC20")) {
		data.userTransfersERC20 = await getWalletNFTTransfers(chain, address);
	}
	if (entities.includes("accountNFTs")) {
		data.accountsNFTs[id] = await getWalletNFTs(chain, id);
	}
	if (entities.includes("userTransfersERC20")) {
		data.accountsTransfersERC20[id] = await getWalletNFTTransfers(chain, id);
	}

	const props: GenericObject = {
		...(await serverSideTranslations(context.locale, ["common", "error"])),
		data: cleanEmpty(data),
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
