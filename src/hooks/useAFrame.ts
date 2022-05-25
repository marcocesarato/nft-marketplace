import {useEffect, useState} from "react";

let AFRAME = null;
export default function useAFrame(callback?: () => void) {
	const [isLoading, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		setLoaded(true);
		if (AFRAME == null && typeof window !== "undefined") {
			// Main
			require("aframe");
			// Polyfills
			require("@utils/polyfills/geometry");
			// Libs
			require("aframe-extras");
			require("aframe-environment-component");
			require("handy-work/build/esm/handy-work.standalone");
			// Utils
			require("@components/AFrame/utils/models");
			require("@components/AFrame/utils/navmesh");
			require("@components/AFrame/utils/physx");
			callback && callback();
		}
	}, [setLoaded, callback]);

	return {isLoading};
}
