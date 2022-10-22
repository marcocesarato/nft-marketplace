import {Box} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Transactions from "@components/Account/Transactions";
import Header from "@components/Header";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyTransactions(): JSX.Element {
	const {t} = useTranslation();
	return (
		<Box width="full">
			<Box
				mx="auto"
				px={{
					base: "6",
					md: "8",
				}}>
				<Box overflowX="auto">
					<Header
						title={t<string>("common:page.transactions.title")}
						subtitle={t<string>("common:page.transactions.description")}
					/>
					<Transactions my={6} />
				</Box>
			</Box>
		</Box>
	);
}
