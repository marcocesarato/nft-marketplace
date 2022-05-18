import {useRouter} from "next/router";
import {GetStaticPaths} from "next/types";
import {Center, Heading} from "@chakra-ui/react";

import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function Account(): JSX.Element {
	const router = useRouter();
	const {id} = router.query;
	return (
		<Center flex="1" p="8">
			<Heading>Account {id}</Heading>
		</Center>
	);
}

export const getStaticPaths: GetStaticPaths<{slug: string}> = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
