import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticPropsLocale({locale}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "error"])),
		},
	};
}
