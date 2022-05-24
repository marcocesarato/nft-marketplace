import {useCallback, useEffect, useState} from "react";

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

	const handleResize = useCallback(() => {
		setDimensions(getDimensions());
	}, [getDimensions]);

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
	}, [handleResize]);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		setTimeout(() => {
			window.dispatchEvent(new Event("resize"));
		}, 50);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [handleResize]);

	return dimensions;
};
export default useDimensions;
