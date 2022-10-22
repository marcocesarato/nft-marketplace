import {useMemo, useRef} from "react";
import {Box} from "@chakra-ui/react";

import useGallery from "@contexts/Gallery";
import useContainerDimensions from "@hooks/useContainerDimensions";

import Block from "./Block";

function Map(): JSX.Element {
	const {schema} = useGallery();
	const mapRef = useRef();
	const {width, height, global} = useContainerDimensions(mapRef);
	const planimetry = schema.getMap();
	const mapHeight = useMemo(() => planimetry.height, [planimetry.height]);
	const mapWidth = useMemo(() => planimetry.width, [planimetry.width]);
	const maxRowWidth = useMemo(() => Math.max(mapWidth, mapHeight), [mapWidth, mapHeight]);
	const size = useMemo(() => width / maxRowWidth, [width, maxRowWidth]);
	const blocks = useMemo(() => {
		return Array.from(Array(mapWidth).keys()).map((row) => (
			<Box as="tr" key={`gallery-row-${row}`} height={size}>
				{Array.from(Array(mapHeight).keys()).map((column) => {
					const id = row * mapWidth + column;
					return <Block key={`gallery-cell-${id}`} item={id} size={size} />;
				})}
			</Box>
		));
	}, [mapHeight, mapWidth, size]);

	return (
		<table
			ref={mapRef}
			style={{
				flex: 2,
				width: "100%",
				height: width,
				maxWidth: (global?.innerHeight ?? height) - 150,
			}}>
			<tbody>{blocks}</tbody>
		</table>
	);
}

export default Map;
