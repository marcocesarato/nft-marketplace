import {useEffect, useState} from "react";

export default function useWebXR() {
	const [supportsVRSession, setSupportsVRSession] = useState(false);
	const [supportsARSession, setSupportsARSession] = useState(false);

	const isWebXRAvailable = !navigator.xr || !navigator.xr.isSessionSupported;

	useEffect(() => {
		if (isWebXRAvailable) {
			var errorHandler = function (err) {
				console.error("WebXR session support error: " + err.message);
			};
			if (navigator.xr.isSessionSupported) {
				// Current WebXR spec uses a boolean-returning isSessionSupported promise
				navigator.xr
					.isSessionSupported("immersive-vr")
					.then(function (supported) {
						setSupportsVRSession(supported);
					})
					.catch(errorHandler);

				navigator.xr
					.isSessionSupported("immersive-ar")
					.then(function (supported) {
						setSupportsARSession(supported);
					})
					.catch(function () {});
			} else if (navigator.xr.supportsSession) {
				// Fallback for implementations that haven't updated to the new spec yet,
				// the old version used supportsSession which is rejected for missing
				// support.
				navigator.xr
					.supportsSession("immersive-vr")
					.then(function () {
						setSupportsVRSession(true);
					})
					.catch(errorHandler);
				navigator.xr
					.supportsSession("immersive-ar")
					.then(function () {
						setSupportsARSession(true);
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
