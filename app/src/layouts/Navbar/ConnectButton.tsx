import {useEffect} from "react";
import {Flex} from "@chakra-ui/react";
import {useAuthRequestChallengeEvm} from "@moralisweb3/next";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import axios from "axios";
import {signIn, /*signOut,*/ useSession} from "next-auth/react";
import {useTranslation} from "next-i18next";
import {useAccount, useNetwork, useSignMessage} from "wagmi";

import useRouterRefresh from "@hooks/useRouterRefresh";

import UserMenu from "./UserMenu";

export default function MyConnectButton({openAccountModal}): JSX.Element {
	const {isConnected, address} = useAccount();
	const {chain} = useNetwork();
	const {status} = useSession();
	const {signMessageAsync} = useSignMessage();
	const {t} = useTranslation();
	const {refresh} = useRouterRefresh();
	const {requestChallengeAsync} = useAuthRequestChallengeEvm();

	useEffect(() => {
		const handleAuth = async () => {
			//const userData = {address, chain: chain.id, network: "evm"};
			//const {data} = await axios.post("/api/auth/request-message", userData);
			//const message = data.message;
			const {message} = await requestChallengeAsync({address: address, chainId: chain.id});
			const signature = await signMessageAsync({message});
			// redirect user after success authentication to '/user' page
			await signIn("credentials", {
				message,
				signature,
				redirect: false,
			});
			refresh();
		};
		if (status === "unauthenticated" && isConnected) {
			handleAuth();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, isConnected]);

	return (
		<>
			<ConnectButton label={t<string>("common:action.connectToWallet")} />
			{isConnected && (
				<Flex alignItems="center" borderRadius="xl" ps="3">
					<UserMenu openAccountModal={openAccountModal} />
				</Flex>
			)}
		</>
	);
}
