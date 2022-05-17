import {PlanimetryBlockType} from "./enums";

export type PlanimetryBlock = {
	id: number;
	texture?: string;
	color?: string;
	type?: PlanimetryBlockType;
};

export type PlanimetryMap = {
	blocks: Set<PlanimetryBlock>;
	width: number;
	height: number;
	spawn?: number;
};
