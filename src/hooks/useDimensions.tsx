import {useCallback, useEffect, useState} from "react";

import useDebounceCallback from "./useDebounceCallback";

const useDimensions = (ref) => {
	const [observer, setObserver] = useState(null);
	const [dimensions, setDimensions] = useState({width: 0, height: 0, global: null});

	const getDimensions = useCallback(
		() => ({
			width: ref?.current?.offsetWidth || 0,
			height: ref?.current?.offsetHeight || 0,
			global: {
				innerHeight: window?.innerHeight,
				innerWidth: window?.innerWidth,
				outerHeight: window?.outerHeight,
				outerWidth: window?.outerWidth,
			},
		}),
		[ref],
	);

	const handleResize = useDebounceCallback(() => {
		setDimensions(getDimensions());
	}, 200);

	useEffect(() => {
		if (ref.current) {
			observer?.disconnect();
			const obs = new ResizeObserver(handleResize);
			obs.observe(ref.current);
			setObserver(obs);
		}
		return () => {
			observer?.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		setTimeout(() => {
			window.dispatchEvent(new Event("resize"));
		}, 50);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return dimensions;
};
export default useDimensions;
