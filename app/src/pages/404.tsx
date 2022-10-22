import ErrorNotFound from "@errors/ErrorNotFound";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function NotFound(): JSX.Element {
	return <ErrorNotFound />;
}
