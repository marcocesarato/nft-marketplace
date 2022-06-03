import {useRouter} from "next/router";
import {GetStaticPaths} from "next/types";

import Account from "@components/Account";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function UserAccount(): JSX.Element {
	const router = useRouter();
	const {id} = router.query;

	return <Account id={id} />;
}

export const getStaticPaths: GetStaticPaths<{slug: string}> = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
