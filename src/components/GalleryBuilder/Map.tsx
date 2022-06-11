import {useMemo, useRef, useState} from "react";
import {Box} from "@chakra-ui/react";

import {PlanimetryBlockTypeEnum} from "@app/enums";
import useGallery from "@contexts/Gallery";
import useContainerDimensions from "@hooks/useDimensions";

import Block from "./Block";

export default function Map(): JSX.Element {
	const {schema} = useGallery();
	const [mouseDown, setMouseDown] = useState(false);
	const [mouseRightDown, setMouseRightDown] = useState(false);
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
					<Box as="tr" key={`galleryRow-${row}`} height={size}>
						{Array.from(Array(planimetry.height).keys()).map((column) => {
							const id = row * planimetry.width + column;
							const cell = planimetry?.blocks?.[row * planimetry.width + column] || {
								id: id,
								type: PlanimetryBlockTypeEnum.Floor,
							};
							return (
								<Block
									key={`galleryCell-${id}`}
									data={cell}
									size={size}
									mouseDown={mouseDown}
									setMouseDown={setMouseDown}
									mouseRightDown={mouseRightDown}
									setMouseRightDown={setMouseRightDown}
								/>
							);
						})}
					</Box>
				))}
			</tbody>
		</table>
	);
}
