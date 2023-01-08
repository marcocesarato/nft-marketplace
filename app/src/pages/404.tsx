import ErrorNotFound from "@errors/ErrorNotFound";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function NotFoundPage(): JSX.Element {
	return <ErrorNotFound />;
}
