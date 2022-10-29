import {useCallback, useEffect, useRef, useState} from "react";
import {Entity, Plane, Text} from "@belivvr/aframe-react";
import {useTranslation} from "next-i18next";
import {useToken} from "wagmi";

import {MapDirection} from "@app/enums";
import {TokenItem} from "@app/types";
import {WallSize} from "@configs/gallery";
import useAccount from "@hooks/useAccount";
import useDebounceCallback from "@hooks/useDebounceCallback";
import useMarket from "@hooks/useMarket";
import {getEmbeddedIPFSUrl} from "@utils/url";

export const defaultModelAttributes = {
	"shadow": {cast: true, receive: true},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
};

type ModelProps = {
	src: string;
	id: string;
	data: TokenItem;
	ratio?: number;
	direction: MapDirection;
	position: {x: number; y: number; z: number};
	rotation: {x: number; y: number; z: number};
	[key: string]: any;
};

export default function Model({
	src,
	data,
	id,
	direction,
	position,
	rotation,
	ratio = 0.8,
	sold = true,
	...props
}: ModelProps): JSX.Element {
	const ref = useRef<HTMLElement>();
	const purchaseRef = useRef<HTMLElement>();
	const [openPanel, setOpenPanel] = useState(false);
	const {t} = useTranslation();
	const {isConnected} = useAccount();
	const {purchase} = useMarket();
	const {data: token} = useToken({
		address: data.token_address as `0x${string}`,
	});

	const handlePurchase = useCallback(() => {
		if (isConnected) {
			purchase(data.token_id, Number(data.price));
		}
	}, [data, isConnected, purchase]);

	const toggleOpen = useDebounceCallback(() => {
		if (!global.dragging) {
			setOpenPanel(!openPanel);
		}
	}, 50);

	const purchaseItem = useDebounceCallback((e) => {
		e.preventDefault();
		if (!global.dragging) {
			handlePurchase();
		}
	}, 50);

	useEffect(() => {
		const element = ref.current;
		if (element) {
			element.addEventListener("mouseup", toggleOpen);
			return () => {
				element.removeEventListener("mouseup", toggleOpen);
			};
		}
	}, [ref, purchaseItem, toggleOpen]);

	useEffect(() => {
		const purchase = purchaseRef.current;
		if (purchase) {
			purchase.addEventListener("mouseup", purchaseItem);
			return () => {
				purchase?.removeEventListener("mouseup", purchaseItem);
			};
		}
	}, [purchaseRef, purchaseItem]);

	const modelPosition = {
		x: 0,
		y: 0,
		z: 0,
	};
	const panelPosition = {
		x: 0,
		y: WallSize / 2,
		z: 0,
	};
	const threshold = 0.01;
	const wallSection = WallSize / 6;
	switch (direction) {
		case MapDirection.East:
		case MapDirection.South:
			modelPosition.z = wallSection + threshold;
			panelPosition.z = wallSection + threshold * 2;
			break;
		case MapDirection.North:
		case MapDirection.West:
		default:
			modelPosition.x = -wallSection - threshold;
			panelPosition.x = -wallSection - threshold * 2;
	}

	const positionToString = (p) => Object.values(p).join(" ");
	const width = WallSize * ratio;
	const height = WallSize * ratio;
	const textHeight = height * 0.9;
	const textWidth = width * 0.9;
	return (
		<>
			<a-entity ref={ref} position={positionToString(position)} id="CIAO">
				<Entity
					gltfModel={getEmbeddedIPFSUrl(src)}
					position={{x: 12, y: 0, z: 4.8}}
					rotation={rotation}
					scale={{x: 2.5, y: 2.5, z: 2.5}}
					autocenter={2.5}
					animation-mixer
				/>
				{openPanel && !sold && (
					<Entity position={panelPosition} rotation={{x: 0, y: -90, z: 0}}>
						<Plane
							class="room-model-panel"
							color="#000"
							height={height}
							width={width}
							material={{opacity: 0.8, transparent: true}}>
							<a-plane
								ref={purchaseRef}
								color="#FFF"
								height={0.5}
								width={2}
								position={`0 -1 ${threshold}`}>
								<Text
									value={
										t<string>("common:action.purchase") +
										" " +
										(data.price_formatted || data.price) +
										" " +
										token?.symbol
									}
									height={textHeight}
									width={textWidth}
									align="center"
									color="#000"
								/>
							</a-plane>
						</Plane>
						<Text
							value={data.name}
							height={textHeight}
							width={textWidth}
							align="center"
							position={{x: 0, y: 1, z: 0}}
						/>
						<Text
							value={`Description: ${data.description}`}
							height={textHeight}
							width={textWidth}
							align="center"
							position={{x: 0, y: 0.7, z: 0}}
						/>
						<Text
							value={`Token Address: ${data.token_address}/${data.token_id}`}
							height={textHeight}
							width={textWidth}
							align="center"
							position={{x: 0, y: 0, z: 0}}
						/>
					</Entity>
				)}
			</a-entity>
		</>
	);
}
