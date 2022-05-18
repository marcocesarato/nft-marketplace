import {memo, useMemo, useRef, useState} from "react";

import {PlanimetryBlockType} from "@app/types/enums";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import useContainerDimensions from "@hooks/useDimensions";

import Block from "./Block";

function Map(): JSX.Element {
	const {planimetry} = useGalleryPlanimetry();

	const [mouseDown, setMouseDown] = useState(false);
	const [mouseRightDown, setMouseRightDown] = useState(false);
	const mapRef = useRef();
	const {width: mapWidth} = useContainerDimensions(mapRef);
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
								type: PlanimetryBlockType.Floor,
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

export default memo(Map);
