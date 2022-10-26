import {Box} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {Transfers} from "@components/Account";
import Header from "@components/Header";
import useAccount from "@hooks/useAccount";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyTransfers(): JSX.Element {
	const {t} = useTranslation();
	const {isConnected, address} = useAccount();

	if (!isConnected)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);

	return (
		<Box width="full">
			<Box
				mx="auto"
				px={{
					base: "6",
					md: "8",
				}}>
				<Box overflowX="auto">
					<Transfers
						my={6}
						address={address}
						title={t<string>("common:page.transfers.title")}
						subtitle={t<string>("common:page.transfers.description")}
					/>
				</Box>
			</Box>
		</Box>
	);
}
