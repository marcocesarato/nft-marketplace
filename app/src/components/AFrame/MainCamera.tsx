import {DetailedHTMLProps, HTMLAttributes} from "react";
import {AssetItem, Assets, Cursor, Entity, Mixin} from "@belivvr/aframe-react";

const Template = "naf-template";
declare global {
	namespace JSX {
		interface IntrinsicElements {
			["naf-template"]: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
		}
	}
}

export default function MainCamera({
	children = null,
	camera = {},
	userHeight = 2,
	...props
}): JSX.Element {
	return (
		<>
			{/* Assets */}
			<Assets>
				<AssetItem
					id="right-gltf"
					src="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/skeleton-right-hand-webxr/model.gltf"></AssetItem>
				<AssetItem
					id="left-gltf"
					src="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/skeleton-left-hand-webxr/model.gltf"></AssetItem>

				<Mixin
					id="blink"
					blink-controls="rotateOnTeleport:false;cameraRig: #cameraRig; teleportOrigin: #avatar; collisionEntities:.navmesh;"></Mixin>
				<Mixin
					id="handle-visual"
					geometry={{width: 0.05, height: 0.05, depth: 0.2}}></Mixin>

				<Mixin
					id="mixin-eye"
					geometry={{primitive: "sphere", radius: 0.2}}
					material={{shader: "flat", side: "double", color: "#FFF"}}></Mixin>
				<Mixin
					id="mixin-pupil"
					geometry={{primitive: "sphere", radius: 0.05}}
					material={{shader: "flat", side: "double", color: "#222"}}></Mixin>
				<Mixin
					id="mixin-arm"
					geometry={{
						primitive: "cylinder",
						depth: 0.2,
						height: 1,
						width: 0.2,
						radius: 0.1,
					}}
					material={{shader: "flat", color: "#222"}}></Mixin>

				<Mixin
					id="mixin-body"
					geometry={{
						primitive: "cylinder",
						depth: 0.5,
						height: 1.2,
						width: 0.65,
						radius: 0.34,
					}}
					material={{shader: "flat", color: "#222"}}></Mixin>

				<Mixin
					id="mixin-neck"
					geometry={{
						primitive: "cylinder",
						depth: 0.3,
						height: 1.3,
						width: 0.2,
						radius: 0.15,
					}}
					material={{shader: "flat", color: "#222"}}></Mixin>

				<Template id="rig-template">
					<Entity></Entity>
				</Template>

				<Template id="avatar-template">
					<Entity>
						<Entity class="avatar" position={{x: 0, y: -4, z: 0}}></Entity>
					</Entity>
				</Template>
			</Assets>
			{/* Camera */}
			<Entity
				id="cameraRig"
				position={{x: 0, y: 0, z: 0}}
				rotation={{x: 0, y: 0, z: 0}}
				spawn-in-circle="radius:3"
				networked="template:#rig-template;"
				movement-controls="speed:0.3;camera:#avatar;"
				navmesh-constraint={`navmesh:.navmesh;fall:0.5;height:${userHeight};exclude:.navmesh-hole;`}
				{...props}>
				<Entity
					id="avatar"
					camera={{near: 0.01}}
					networked="template:#avatar-template;"
					lookControls={{pointerLockEnabled: false}}
					position={{x: 0, y: userHeight, z: 0}}
					visible={false}
					{...camera}>
					<Cursor cursor={{rayOrigin: "mouse"}} />
				</Entity>

				{/* Hand tracking */}
				<Entity handy-controls="materialOverride:both;">
					{/* These also do teleportaion for Blink controls in VR */}
					{/* These are present for hand tracking but hands don't have joysticks so do nothing */}
					<Entity
						data-right="ray"
						mixin="blink"
						cursor={{fuse: true}}
						raycaster={{
							showLine: false,
							far: 100,
							lineColor: "red",
							objects: "[html]",
							interval: 100,
						}}></Entity>
					<Entity
						data-left="ray"
						mixin="blink"
						cursor={{fuse: true}}
						raycaster={{
							showLine: false,
							far: 100,
							lineColor: "red",
							objects: "[html]",
							interval: 100,
						}}></Entity>

					{/* Use the finger tips for teleporting when the user points in VR with hand tracking */}
					<Entity
						data-right="index-finger-tip"
						mixin="blink"
						blink-controls="startEvents:pose_point;cancelEvents:pose_cancel_point;endEvents:pose_point_fuseLong;"></Entity>
					<Entity
						data-left="index-finger-tip"
						mixin="blink"
						blink-controls="startEvents:pose_point;cancelEvents:pose_cancel_point;endEvents:pose_point_fuseLong;"></Entity>

					{/* These get drawn towards grabable objects, moving the whole hand and the attached elements*/}
					<Entity
						id="left-magnet"
						position={{x: 0, y: 0.6, z: 0}}
						class="avatar-hand-left"
						data-left="grip"
						data-magnet="magnet-left"
						grab-magnet-target="startEvents:squeezestart,pose_fist;stopEvents:pose_flat_fuseShort,squeezeend;noMagnetEl:#left-no-magnet;"
						/*networked-hand-controls="hand:left;color:gold;"
					    networked="template:#left-hand-default-template"*/
					></Entity>
					<Entity
						id="right-magnet"
						position={{x: 0, y: 0.6, z: 0}}
						class="avatar-hand-right"
						data-right="grip"
						data-magnet="magnet-right"
						grab-magnet-target="startEvents:squeezestart,pose_fist;stopEvents:pose_flat_fuseShort,squeezeend;noMagnetEl:#right-no-magnet;"
						/*networked-hand-controls="hand:right;color:gold;"
					    networked="template:#right-hand-default-template"*/
					></Entity>

					{/* Markers to let us know the real location of the hands, you probably want to make them visible="false" or just make them empty <a-entities> */}
					<Entity
						id="left-no-magnet"
						data-left="grip"
						data-no-magnet
						radius="0.01"></Entity>
					<Entity
						id="right-no-magnet"
						data-right="grip"
						data-no-magnet
						radius="0.01"></Entity>
				</Entity>

				<Entity
					id="animated-f"
					gltfModel={`${process.env.NEXT_PUBLIC_URL}/assets/models/animated-m.glb`}></Entity>
				<Entity
					id="animated-m"
					gltfModel={`${process.env.NEXT_PUBLIC_URL}/assets/models/animated-m.glb`}></Entity>
			</Entity>
			{children}
		</>
	);
}
