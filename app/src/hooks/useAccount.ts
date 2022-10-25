import {useAccount} from "wagmi";

export default function useMyAccount() {
	const account = useAccount();
	const address = String(account.address ?? "").toLowerCase();

	return {
		...account,
		address,
	};
}
