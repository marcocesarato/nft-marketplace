import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import {initReactI18next} from "react-i18next";

const ns = ["common", "error"];
const supportedLngs = ["en", "it"];
const resources = ns.reduce((acc, n) => {
	supportedLngs.forEach((lng) => {
		if (!acc[lng]) acc[lng] = {};
		acc[lng] = {
			...acc[lng],
			[n]: require(`../public/locales/${lng}/${n}.json`),
		};
	});
	return acc;
}, {});

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: "en",
		fallbackLng: "en",
		defaultNS: "common",
		ns,
		interpolation: {escapeValue: false},
		react: {useSuspense: false},
		supportedLngs,
		resources,
	});

export default i18n;
