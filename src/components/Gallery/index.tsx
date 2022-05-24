import React, {useEffect, useRef} from "react";
import {
	AssetItem,
	Assets,
	Entity,
	Light,
	Mixin,
	Scene,
	Sky,
	Sphere,
	Torus,
} from "@belivvr/aframe-react";

import {Environment} from "@components/AFrame";
import Content from "@components/Content";
import Loading from "@components/Loading";
import useAFrame from "@hooks/useAFrame";

export default function Gallery(): JSX.Element {
	const scene = useRef();
	const {isLoading} = useAFrame(() => {
		// Load modules
		require("./utils/models");
		require("./utils/navmesh");
		require("./utils/physx");
	});

	useEffect(() => {
		if (scene.current) {
			const canvas = document.querySelector("#a-scene canvas");
			canvas.setAttribute("tabindex", "0");
		}
	}, [scene]);

	if (!isLoading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}

	return (
		<div ref={scene} style={{position: "relative"}}>
			<Scene
				id="a-scene"
				fog={{type: "linear", color: "#000", far: 50, near: 10}}
				background={{color: "skyblue"}}
				renderer={{alpha: true, antialias: true}}
				shadow={{type: "pcfsoft"}}
				gltfModel={{
					dracoDecoderPath:
						"https://cdn.jsdelivr.net/npm/three@0.129.0/examples/js/libs/draco/gltf/",
				}}
				physx="autoLoad: true; delay: 1000; wasmUrl: https://stemkoski.github.io/A-Frame-Examples/js/physx.release.wasm; useDefaultScene: false;"
				raycaster="objects: Sphere"
				loading-screen="dotsColor: #000; backgroundColor: #FFF"
				deviceOrientationPermissionUI={{enabled: true}}>
				{/* Environment */}
				<Environment config="preset: forest; grid: cross"></Environment>

				{/* Sky */}
				<Sky id="sky" color="#0000ff"></Sky>

				{/* Light */}
				<Light light={{type: "ambient", castShadow: false}} intensity={0.4}></Light>
				<Light
					id="dirlight"
					shadow-camera-automatic=".navmesh"
					intensity={0.6}
					light={{castShadow: true, type: "directional"}}
					position={{x: 0, y: 15, z: -6}}></Light>

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
				<Entity position={{x: 0, y: 0, z: 0}} rotation={{x: 0, y: 0, z: 0}} id="cameraRig">
					<Entity
						id="head"
						camera={{near: 0.01}}
						lookControls={{enabled: true}}
						position={{x: 0, y: 1.65, z: 0}}
						wasdControls={{enabled: true, acceleration: 20}}
						navmesh-constraint="navmesh:.navmesh;fall:0.5;height:1.6;exclude:.navmesh-hole;"></Entity>

					{/* Hand tracking */}
					<Entity
						handy-controls="right:#right-gltf;materialOverride:right;"
						material={{color: "gold", metalness: 1, roughness: 0}}>
						{/* For screen space inputs like mobile AR */}
						<Torus
							radius={0.008}
							radiusTubular={0.001}
							material={{shader: "flat", color: "blue"}}
							data-none="screen-0"></Torus>
						<Torus
							radius={0.008}
							radiusTubular={0.001}
							material={{shader: "flat", color: "green"}}
							data-none="screen-1"></Torus>
						<Torus
							radius={0.008}
							radiusTubular={0.001}
							material={{shader: "flat", color: "red"}}
							data-none="screen-2"></Torus>

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
			</Scene>
		</div>
	);
}
