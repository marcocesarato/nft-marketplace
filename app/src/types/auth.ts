import {ISODateString} from "next-auth";

export type TUserData = {
	address: string;
	signature: string;
	profileId: string;
	expirationTime: ISODateString;
};

export interface ISession {
	user: TUserData;
}
