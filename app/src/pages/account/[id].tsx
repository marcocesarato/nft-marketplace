import {useRouter} from "next/router";

import Account from "@components/Account";
import {getServerSidePropsHandler} from "@utils/ssr";

export const getServerSideProps = getServerSidePropsHandler([
	"accountNFTs",
	"accountTransfersERC20",
]);
export default function UserAccount(): JSX.Element {
	const router = useRouter();
	const {id} = router.query;

	return <Account id={id} />;
}
