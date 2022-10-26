import {GetStaticPaths} from "next";

export const getStaticPathsFallback: GetStaticPaths<{slug: string}> = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
