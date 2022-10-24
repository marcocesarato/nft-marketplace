import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import {withSessionSsr} from "./session";

export const getServerSidePropsSession = withSessionSsr(async function getServerSideProps({
	req,
	locale,
}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "error"])),
			isLoggedSession: req.session.isAuthenticated,
		},
	};
});

export async function getStaticPropsLocale({locale, ...otherProps}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "error"])),
			...otherProps,
		},
	};
}
