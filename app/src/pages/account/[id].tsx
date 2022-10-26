import {useRouter} from "next/router";

import Account from "@components/Account";
import {getStaticPropsLocale} from "@utils/i18n";
import {getStaticPathsFallback} from "@utils/paths";

export const getStaticPaths = getStaticPathsFallback;
export const getStaticProps = getStaticPropsLocale;
export default function UserAccount(): JSX.Element {
	const router = useRouter();
	const {id} = router.query;

	return <Account id={id} />;
}
