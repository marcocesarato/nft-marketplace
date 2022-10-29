import {useEffect, useState} from "react";

export default function useAFrame(callback?: () => void) {
	const [isLoading, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		setLoaded(true);
		if (global.AFRAME == null && typeof global.window !== "undefined") {
			try {
				// Main
				require("aframe");
				// Polyfills
				require("@utils/polyfills/geometry");
				// Libs
				require("aframe-extras");
				require("aframe-environment-component");
				require("handy-work/build/esm/handy-work.standalone");
				// Utils
				require("@components/AFrame/utils/glft");
				require("@components/AFrame/utils/navmesh");
				require("@components/AFrame/utils/physx");
				require("@components/AFrame/utils/networked");
				require("@components/AFrame/utils/spawnInCircle");
				require("@components/AFrame/utils/avatar");

				const {io} = require("socket.io-client");
				global.io = io;

				callback && callback();
			} catch (err) {
				console.warn("aframe error: ", err);
			}
		}
	}, [setLoaded, callback]);

	return {isLoading};
}
