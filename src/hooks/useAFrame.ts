import {DOMAttributes, useEffect, useState} from "react";

let AFRAME = null;
export default function useAFrame(callback?: () => void) {
	const [isLoading, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		setLoaded(true);
		if (AFRAME == null && typeof window !== "undefined") {
			require("aframe");
			require("aframe-extras");
			require("aframe-environment-component");
			require("handy-work/build/esm/handy-work.standalone");
			callback && callback();
		}
	}, [setLoaded, callback]);

	return {isLoading};
}

type AFrameElement<T> = Partial<T & DOMAttributes<T> & {children: any}>;
declare global {
	namespace JSX {
		interface IntrinsicElements {
			["a-scene"]: AFrameElement<any>;
			["a-entity"]: AFrameElement<any>;
			["a-plane"]: AFrameElement<any>;
			["a-sphere"]: AFrameElement<any>;
			["a-sky"]: AFrameElement<any>;
			["a-light"]: AFrameElement<any>;
		}
	}
}
