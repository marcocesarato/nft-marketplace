import {PlanimetryBlockType} from "./enums";

export type PlanimetryBlock = {
	id: number;
	material: string;
	color: string;
	type?: PlanimetryBlockType;
};

export type PlanimetryMap = {
	blocks: Set<PlanimetryBlock>;
	width: number;
	height: number;
};
