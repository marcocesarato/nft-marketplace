import {memo, useRef, useState} from "react";

import {PlanimetryBlockType} from "@app/types/enums";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import useContainerDimensions from "@hooks/useDimensions";

import Block from "./Block";

function Map(): JSX.Element {
	const {planimetry, size} = useGalleryPlanimetry();

	const [mouseDown, setMouseDown] = useState(false);
	const [mouseRightDown, setMouseRightDown] = useState(false);
	const mapRef = useRef();
	const {width: mapWidth} = useContainerDimensions(mapRef);

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
				{Array.from(Array(size).keys()).map((row) => (
					<tr key={row}>
						{Array.from(Array(size).keys()).map((column) => {
							const id = row * size + column;
							const cell = planimetry?.blocks?.[row * size + column] || {
								id: id,
								type: PlanimetryBlockType.Floor,
							};
							return (
								<Block
									key={id}
									data={cell}
									size={mapWidth / size}
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
