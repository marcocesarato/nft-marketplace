import {useEffect, useState} from "react";

let AFRAME = null;
export default function useAFrame() {
	const [isLoading, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		setLoaded(true);
		if (AFRAME == null && typeof window !== "undefined") {
			require("aframe"); // eslint-disable-line global-require
		}
	}, [setLoaded]);

	return {isLoading};
}
