import {Entity, Image} from "@belivvr/aframe-react";

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
	position: {x: number; y: number; z: number};
	[key: string]: any;
};

export default function Picture({src, ratio = 0.8, position, ...props}: PictureProps): JSX.Element {
	return (
		<Entity position={position}>
			<Image
				{...defaultPictureAttributes}
				src={src}
				position={{x: 0, y: 0, z: -WallSize / 6 - 0.01}}
				height={WallSize * ratio}
				width={WallSize * ratio}
				{...props}
			/>
		</Entity>
	);
}
