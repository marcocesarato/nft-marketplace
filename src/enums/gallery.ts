export enum PlanimetryBlockType {
	Wall = "Wall",
	Floor = "Floor",
	Door = "Door",
	Window = "Window",
}

export enum ObjectModelType {
	Picture = "Picture",
	Object = "Object",
	GLFT = "GLFT",
	GLB = "GLB",
}

export enum GalleryActionTypes {
	SetData = "SET_DATA",
	SetBlock = "SET_BLOCK",
	SetSpawn = "SET_SPAWN",
	SetSize = "SET_SIZE",
	ResetMap = "RESET_MAP",
}

export enum GalleryAssetTypes {
	Image = "Image",
	Item = "Item",
}

export enum GalleryBuilderMode {
	Select = "Select",
	Planimetry = "Planimetry",
	Spawn = "Spawn",
	Erase = "Erase",
	Color = "Color",
}

export enum MapDirection {
	North = "North",
	East = "East",
	South = "South",
	West = "West",
	NorthEast = "NorthEast",
	NorthWest = "NorthWest",
	SouthEast = "SouthEast",
	SouthWest = "SouthWest",
}

export const PlanimetryBlockTypeEnum = {
	Wall: "Wall" as PlanimetryBlockType,
	Floor: "Floor" as PlanimetryBlockType,
	Door: "Door" as PlanimetryBlockType,
	Window: "Window" as PlanimetryBlockType,
};

export const ObjectModelTypeEnum = {
	Picture: "Picture" as ObjectModelType,
	Object: "Object" as ObjectModelType,
	GLFT: "GLFT" as ObjectModelType,
	GLB: "GLB" as ObjectModelType,
};

export const GalleryActionTypesEnum = {
	SetData: "SET_DATA" as GalleryActionTypes,
	SetBlock: "SET_BLOCK" as GalleryActionTypes,
	SetSpawn: "SET_SPAWN" as GalleryActionTypes,
	SetSize: "SET_SIZE" as GalleryActionTypes,
	ResetMap: "RESET_MAP" as GalleryActionTypes,
};

export const GalleryAssetTypesEnum = {
	Image: "Image" as GalleryAssetTypes,
	Item: "Item" as GalleryAssetTypes,
};

export const GalleryBuilderModeEnum = {
	Select: "Select" as GalleryBuilderMode,
	Planimetry: "Planimetry" as GalleryBuilderMode,
	Spawn: "Spawn" as GalleryBuilderMode,
	Erase: "Erase" as GalleryBuilderMode,
	Color: "Color" as GalleryBuilderMode,
};

export const MapDirectionEnum = {
	North: "North" as MapDirection,
	East: "East" as MapDirection,
	South: "South" as MapDirection,
	West: "West" as MapDirection,
	NorthEast: "NorthEast" as MapDirection,
	NorthWest: "NorthWest" as MapDirection,
	SouthEast: "SouthEast" as MapDirection,
	SouthWest: "SouthWest" as MapDirection,
};
