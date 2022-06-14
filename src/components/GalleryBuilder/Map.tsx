import {useMemo, useRef} from "react";
import {Box} from "@chakra-ui/react";

import useGallery from "@contexts/Gallery";
import useContainerDimensions from "@hooks/useContainerDimensions";

import Block from "./Block";

function Map(): JSX.Element {
	const {schema} = useGallery();
	const mapRef = useRef();
	const {width: mapWidth, height, global} = useContainerDimensions(mapRef);
	const planimetry = schema.getMap();
	const maxRowWidth = useMemo(
		() => Math.max(planimetry.width, planimetry.height),
		[planimetry.width, planimetry.height],
	);
	const size = useMemo(() => mapWidth / maxRowWidth, [mapWidth, maxRowWidth]);

	return (
		<table
			ref={mapRef}
			style={{
				flex: 2,
				width: "100%",
				height: mapWidth,
				maxWidth: (global?.innerHeight ?? height) - 150,
			}}>
			<tbody>
				{Array.from(Array(planimetry.width).keys()).map((row) => (
					<Box as="tr" key={`gallery-row-${row}`} height={size}>
						{Array.from(Array(planimetry.height).keys()).map((column) => {
							const id = row * planimetry.width + column;
							return <Block key={`gallery-cell-${id}`} item={id} size={size} />;
						})}
					</Box>
				))}
			</tbody>
		</table>
	);
}

export default Map;
