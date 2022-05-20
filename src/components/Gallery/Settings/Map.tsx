import {useMemo, useRef, useState} from "react";

import {PlanimetryBlockTypeEnum} from "@app/enums";
import useGallery from "@contexts/Gallery";
import useContainerDimensions from "@hooks/useDimensions";

import Block from "./Block";

export default function Map(): JSX.Element {
	const {schema} = useGallery();
	const [mouseDown, setMouseDown] = useState(false);
	const [mouseRightDown, setMouseRightDown] = useState(false);
	const mapRef = useRef();
	const {width: mapWidth} = useContainerDimensions(mapRef);
	const planimetry = schema.getMap();
	const size = useMemo(
		() => mapWidth / Math.max(planimetry.width, planimetry.height),
		[mapWidth, planimetry.width, planimetry.height],
	);

	return (
		<table
			ref={mapRef}
			style={{
				flex: 2,
				width: "100%",
				height: mapWidth,
				maxWidth: window.innerHeight - 200,
			}}>
			<tbody>
				{Array.from(Array(planimetry.width).keys()).map((row) => (
					<tr key={`galleryRow-${row}`}>
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
					</tr>
				))}
			</tbody>
		</table>
	);
}
