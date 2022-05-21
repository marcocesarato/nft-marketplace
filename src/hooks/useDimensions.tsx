import {useCallback, useEffect, useState} from "react";

const useDimensions = (ref) => {
	const [observer, setObserver] = useState(null);
	const [dimensions, setDimensions] = useState({width: 0, height: 0});

	const getDimensions = useCallback(
		() => ({
			width: ref.current.offsetWidth,
			height: ref.current.offsetHeight,
		}),
		[ref],
	);

	useEffect(() => {
		const handleResize = () => {
			setDimensions(getDimensions());
		};

		if (ref.current) {
			observer?.disconnect();
			const obs = new ResizeObserver(handleResize);
			obs.observe(ref.current);

			setObserver(obs);
			setDimensions(getDimensions());
		}

		window.addEventListener("resize", handleResize);
		setTimeout(() => {
			window.dispatchEvent(new Event("resize"));
		}, 50);
		return () => {
			observer?.disconnect();
			window.removeEventListener("resize", handleResize);
		};
	}, [getDimensions, observer, ref]);

	return dimensions;
};
export default useDimensions;
