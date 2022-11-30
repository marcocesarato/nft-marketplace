import Moralis from "moralis";
import NextAuth, {NextAuthOptions, Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {ISession} from "@app/types";
import {startMoralis} from "@services/api";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "MoralisAuth",
			credentials: {
				message: {
					label: "Message",
					type: "text",
					placeholder: "0x0",
				},
				signature: {
					label: "Signature",
					type: "text",
					placeholder: "0x0",
				},
			},
			// @ts-ignore
			async authorize(credentials) {
				try {
					const {message, signature} = credentials as Record<string, string>;

					await startMoralis();

					const {address, profileId, expirationTime, uri} = (
						await Moralis.Auth.verify({message, signature, network: "evm"})
					).raw;
					const nextAuthUrl = process.env.NEXTAUTH_URL;

					if (uri !== nextAuthUrl) {
						return null;
					}

					const user = {address, profileId, expirationTime, signature};

					return user;
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(e);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({token, user}) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({session, token}) {
			session.expires = (token as unknown as ISession).user.expirationTime;
			(session as unknown as ISession).user = (token as unknown as ISession).user;
			return session as Session;
		},
	},
	session: {
		strategy: "jwt",
	},
};

export default NextAuth(authOptions);
