import {useMemo} from "react";

import {PlanimetryBlockType} from "@app/enums";
import useGallery from "@contexts/Gallery";
import {clone} from "@utils/converters";

import Door from "./Door";
import Floor from "./Floor";
import Wall from "./Wall";
import Window from "./Window";

export default function Block3D(props) {
	const {blockId} = props;
	const {schema} = useGallery();
	const data = useMemo(() => schema.getBlock(blockId), [blockId, schema]);
	const blockData = useMemo(() => clone(data), [data]);

	if (blockData.type === PlanimetryBlockType.Wall) {
		return <Wall {...props} />;
	}

	if (blockData.type === PlanimetryBlockType.Window) {
		return <Window {...props} />;
	}

	if (blockData.type === PlanimetryBlockType.Door) {
		return <Door {...props} />;
	}

	if (blockData.type === PlanimetryBlockType.Window) {
		return <Window {...props} />;
	}

	return <Floor {...props} />;
}
