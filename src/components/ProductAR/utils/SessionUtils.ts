import type {XRSystem} from "webxr";
/**
 * XR session running.
 */
let currentSession = null;

/**
 * Used to manage wich XR session is currently running and prevent multiple sessions from running concorrently.
 */
export default class SessionUtils {
	/**
	 * Start webxr session for immersive-ar with the provided session configuration.
	 *
	 * If there is a session already running the method will throw an error.
	 *
	 * @param {WebGLRenderer} renderer - WebGL renderer object.
	 * @param {any} sessionInit - Session initialization data.
	 * @param {Function} onError - Callback method called if an error occurs.
	 */
	static start(
		renderer,
		sessionInit = {},
		onError = function (e) {
			console.error(e);
		},
	) {
		if (currentSession === null) {
			const onSessionStarted = (session) => {
				session.addEventListener("end", onSessionEnded);
				renderer.xr.setReferenceSpaceType("local");
				renderer.xr.setSession(session);
				currentSession = session;
			};

			const onSessionEnded = (event) => {
				currentSession.removeEventListener("end", onSessionEnded);
				currentSession = null;
			};

			((navigator as any)?.xr as XRSystem)
				?.requestSession("immersive-ar", sessionInit)
				.then(onSessionStarted)
				.catch(onError);
		}
	}

	/**
	 * End the session.
	 */
	static end() {
		if (!currentSession === null) {
			currentSession.end();
			currentSession = null;
		}
	}
}
