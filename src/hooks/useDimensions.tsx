import {useCallback, useEffect, useState} from "react";

const useDimensions = (ref) => {
	const getDimensions = useCallback(
		() => ({
			width: ref.current.offsetWidth,
			height: ref.current.offsetHeight,
		}),
		[ref],
	);

	const [dimensions, setDimensions] = useState({width: 0, height: 0});

	useEffect(() => {
		const handleResize = () => {
			setDimensions(getDimensions());
		};

		if (ref.current) {
			setDimensions(getDimensions());
		}

		window.addEventListener("resize", handleResize);
		setTimeout(() => {
			window.dispatchEvent(new Event("resize"));
		}, 50);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [getDimensions, ref]);

	return dimensions;
};
export default useDimensions;
