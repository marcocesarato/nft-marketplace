import {useTranslation} from "next-i18next";

import {Owned} from "@components/Account";
import Content from "@components/Content";
import useAccount from "@hooks/useAccount";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function AssetsPage(): JSX.Element {
	const {t} = useTranslation();
	const {address} = useAccount();
	return (
		<Content>
			<Owned
				address={address}
				title={t<string>("common:page.assets.title")}
				subtitle={t<string>("common:page.assets.description")}
			/>
		</Content>
	);
}
