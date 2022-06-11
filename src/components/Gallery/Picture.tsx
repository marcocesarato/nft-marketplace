import {Entity, Image} from "@belivvr/aframe-react";

import {MapDirection} from "@/src/enums";
import {WallSize} from "@configs/gallery";

export const defaultPictureAttributes = {
	"height": WallSize,
	"width": WallSize,
	"shadow": {cast: true, receive: true},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
};

type PictureProps = {
	src: string;
	ratio?: number;
	direction: MapDirection;
	position: {x: number; y: number; z: number};
	[key: string]: any;
};

export default function Picture({
	src,
	ratio = 0.8,
	direction,
	position,
	...props
}: PictureProps): JSX.Element {
	const picturePosition = {
		x: 0,
		y: 0,
		z: 0,
	};
	const threshold = 0.01;
	const wallSection = WallSize / 6;
	if (direction === MapDirection.North) {
		picturePosition.z = -wallSection - threshold;
	}
	if (direction === MapDirection.East) {
		picturePosition.x = wallSection + threshold;
	}
	if (direction === MapDirection.South) {
		picturePosition.z = wallSection + threshold;
	}
	if (direction === MapDirection.West) {
		picturePosition.x = -wallSection - threshold;
	}
	return (
		<Entity position={position}>
			<Image
				{...defaultPictureAttributes}
				src={src}
				position={picturePosition}
				height={WallSize * ratio}
				width={WallSize * ratio}
				{...props}
			/>
		</Entity>
	);
}
