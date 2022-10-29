export enum PlanimetryBlockType {
	Wall = "Wall",
	Floor = "Floor",
	Door = "Door",
	Window = "Window",
}

export enum ObjectModelType {
	Picture = "Picture",
	Video = "Video",
	Audio = "Audio",
	Object = "Object",
}

export enum GalleryActionType {
	SetData = "SET_DATA",
	SetBlock = "SET_BLOCK",
	SetSpawn = "SET_SPAWN",
	SetSize = "SET_SIZE",
	ResetMap = "RESET_MAP",
}

export enum GalleryAssetType {
	Image = "Image",
	Item = "Item",
}

export enum GalleryBuilderMode {
	Select = "Select",
	Planimetry = "Planimetry",
	Doors = "Doors",
	Windows = "Windows",
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

export const GalleryActionTypeEnum = {
	SetData: "SET_DATA" as GalleryActionType,
	SetBlock: "SET_BLOCK" as GalleryActionType,
	SetBlockMetadata: "SET_BLOCK_METADATA" as GalleryActionType,
	SetSpawn: "SET_SPAWN" as GalleryActionType,
	SetSize: "SET_SIZE" as GalleryActionType,
	ResetMap: "RESET_MAP" as GalleryActionType,
};

export const GalleryAssetTypeEnum = {
	Image: "Image" as GalleryAssetType,
	Item: "Item" as GalleryAssetType,
};

export const GalleryBuilderModeEnum = {
	Select: "Select" as GalleryBuilderMode,
	Planimetry: "Planimetry" as GalleryBuilderMode,
	Doors: "Doors" as GalleryBuilderMode,
	Windows: "Windows" as GalleryBuilderMode,
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

export function getMapDirectionEnum(direction: string): MapDirection {
	return MapDirectionEnum[direction.charAt(0).toUpperCase() + direction.slice(1).toLowerCase()];
}
