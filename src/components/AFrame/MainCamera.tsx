import React from "react";
import {AssetItem, Assets, Entity, Mixin, Sphere} from "@belivvr/aframe-react";

export default function MainCamera({
	children = null,
	camera = {},
	userHeight = 1.65,
	...props
}): JSX.Element {
	return (
		<>
			{children}
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
					blink-controls="rotateOnTeleport:false;cameraRig: #cameraRig; teleportOrigin: #head; collisionEntities:.navmesh;"></Mixin>
				<Mixin
					id="handle-visual"
					geometry={{width: 0.05, height: 0.05, depth: 0.2}}></Mixin>
			</Assets>
			{/* Camera */}
			<Entity
				position={{x: 0, y: 0, z: 0}}
				rotation={{x: 0, y: 0, z: 0}}
				id="cameraRig"
				{...props}>
				<Entity
					id="head"
					camera={{near: 0.5}}
					lookControls={{enabled: true}}
					position={{x: 0, y: userHeight, z: 0}}
					wasdControls={{enabled: true, acceleration: 20}}
					navmesh-constraint={`navmesh:.navmesh;fall:0.5;height:${userHeight};exclude:.navmesh-hole;`}
					{...camera}
				/>

				{/* Hand tracking */}
				<Entity
					handy-controls="right:#right-gltf;materialOverride:right;"
					material={{color: "gold", metalness: 1, roughness: 0}}>
					{/* Use the finger tips for teleporting when the user points */}
					<Entity
						data-right="index-finger-tip"
						mixin="blink"
						blink-controls="startEvents:pose_point_fuseShort;endEvents:pose_point_fuseLong;endEvents:pose_cancel_point;"></Entity>
					<Entity
						data-left="index-finger-tip"
						mixin="blink"
						blink-controls="startEvents:pose_point_fuseShort;endEvents:pose_point_fuseLong;endEvents:pose_cancel_point;"></Entity>

					{/* The direction hands are facing, we will also attach labels to show the currently detected pose or controller button */}
					{/* These also do teleportaion for Blink controls in VR */}
					<Entity
						data-right="ray"
						mixin="blink"
						html-pointer=""
						raycaster={{
							objects: "[html]",
							far: 0.3,
							showLine: false,
							lineColor: "black",
						}}>
						<Entity
							position={{x: 0, y: 0, z: -0.22}}
							visible={false}
							class="pose-label"
							text={{value: "Hello World", align: "center"}}></Entity>
					</Entity>
					<Entity
						data-left="ray"
						mixin="blink"
						html-pointer=""
						raycaster={{
							objects: "[html]",
							far: 0.3,
							showLine: false,
							lineColor: "black",
						}}>
						<Entity
							position={{x: 0, y: 0, z: -0.22}}
							visible={false}
							class="pose-label"
							text={{value: "Hello World", align: "center"}}></Entity>
					</Entity>

					{/* These get drawn towards grabable objects, moving the whole hand and the attached elements */}
					<Entity
						id="left-magnet"
						data-left="grip"
						data-magnet="magnet-left"
						grab-magnet-target="startEvents:squeezestart,pose_fist;stopEvents:pose_flat_fuseShort,squeezeend;noMagnetEl:#left-no-magnet;"></Entity>
					<Entity
						id="right-magnet"
						data-right="grip"
						data-magnet="magnet-right"
						grab-magnet-target="startEvents:squeezestart,pose_fist;stopEvents:pose_flat_fuseShort,squeezeend;noMagnetEl:#right-no-magnet;"></Entity>

					{/* Invisible objects at the tips of each finger for physics or intersections */}
					<Sphere
						data-right="index-finger-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-right="middle-finger-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-right="ring-finger-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-right="pinky-finger-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-right="thumb-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-left="index-finger-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-left="middle-finger-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-left="ring-finger-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-left="pinky-finger-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
					<Sphere
						data-left="thumb-tip"
						radius={0.004}
						visible={false}
						physx-body="type: kinematic;"></Sphere>
				</Entity>
			</Entity>
		</>
	);
}
