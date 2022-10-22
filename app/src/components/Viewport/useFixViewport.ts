import {useEffect} from "react";

const isBrowser = typeof window !== "undefined";

export default function useFixViewport() {
	useEffect(() => {
		const updateCssViewportHeight = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		};

		if (isBrowser) {
			updateCssViewportHeight();
			window.addEventListener("resize", updateCssViewportHeight);
		}

		return () => {
			if (isBrowser) {
				window.removeEventListener("resize", updateCssViewportHeight);
			}
		};
	}, []);
}
