import {useEffect, useState} from "react";

export default function useWebXR() {
	const xr = (navigator as any)?.xr as XRSystem;

	const [supportsVRSession, setSupportsVRSession] = useState(false);
	const [supportsARSession, setSupportsARSession] = useState(false);

	const isWebXRAvailable = xr && xr?.isSessionSupported;

	useEffect(() => {
		if (isWebXRAvailable) {
			var errorHandler = function (err) {
				console.error("WebXR session support error: " + err.message);
			};
			if (xr?.isSessionSupported) {
				// Current WebXR spec uses a boolean-returning isSessionSupported promise
				xr.isSessionSupported("immersive-vr")
					.then(function (supported) {
						setSupportsVRSession(supported);
					})
					.catch(errorHandler);

				xr.isSessionSupported("immersive-ar")
					.then(function (supported) {
						setSupportsARSession(supported);
					})
					.catch(function () {});
			} else {
				console.error("WebXR has neither isSessionSupported or supportsSession?!");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		isAvailable: isWebXRAvailable,
		supportsVRSession,
		supportsARSession,
	};
}
