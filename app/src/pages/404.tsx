import ErrorNotFound from "@errors/ErrorNotFound";
import {getStaticPropsLocale} from "@utils/ssr";

export const getStaticProps = getStaticPropsLocale;
export default function NotFound(): JSX.Element {
	return <ErrorNotFound />;
}
