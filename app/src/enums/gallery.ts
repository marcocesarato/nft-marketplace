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
	SetBlockMetadata = "SET_BLOCK_METADATA",
	SetSpawn = "SET_SPAWN",
	SetSize = "SET_SIZE",
	ResetMap = "RESET_MAP",
}

export enum GalleryAssetType {
	Image = "Image",
	Item = "Item",
	Video = "Video",
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

export function getMapDirection(direction: string): MapDirection {
	return MapDirection[direction.charAt(0).toUpperCase() + direction.slice(1).toLowerCase()];
}
