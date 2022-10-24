import type {IronSessionOptions} from "iron-session";

export const sessionOptions: IronSessionOptions = {
	password: process.env.AUTH_SECRET_KEY as string,
	cookieName: "MARKETPLACE_SESSION",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};

declare module "iron-session" {
	interface IronSessionData {
		account?: string;
		isAuthenticated?: boolean;
	}
}
