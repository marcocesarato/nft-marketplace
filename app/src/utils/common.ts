import {io} from "socket.io-client";

export function debounce(
	func: (args: IArguments) => any,
	wait: number,
	immediate: boolean = false,
) {
	let timeout: NodeJS.Timeout | undefined;

	return function executedFunction(this: any) {
		const context: any = this;
		const args = arguments;
		const later = () => {
			timeout = undefined;
			if (!immediate) {
				func.apply(context, [args]);
			}
		};
		const callNow: boolean = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, [args]);
		}
	};
}

export function throttle(fn: (args: any[]) => any, wait: number) {
	let shouldWait = false;
	return function () {
		if (!shouldWait) {
			fn([arguments]);
			shouldWait = true;
			setTimeout(() => (shouldWait = false), wait);
		}
	};
}

export function limitWords(string: string, words: number = 10) {
	return string.split(/\s+/, words).join(" ");
}

export async function socketAudio(room: string) {
	await fetch("/api/socket");
	const socket = io();
	if (
		!(navigator as any).getUserMedia &&
		!(navigator as any).webkitGetUserMedia &&
		!(navigator as any).mozGetUserMedia
	) {
		console.log("getUserMedia not supported on your browser!");
		return;
	}
	let chunks = [];
	navigator.mediaDevices.getUserMedia({audio: true}).then((mediaStream) => {
		const mediaRecorder = new MediaRecorder(mediaStream);
		mediaRecorder.onstart = function (e) {
			chunks = [];
		};
		mediaRecorder.ondataavailable = function (e) {
			chunks.push(e.data);
		};
		mediaRecorder.onstop = function (e) {
			const blob = new Blob(chunks, {"type": "audio/ogg; codecs=opus"});
			socket.emit("voice", blob);
		};

		// Start recording
		mediaRecorder.start();

		// Stop recording after 1 seconds and broadcast it to server
		setTimeout(function () {
			mediaRecorder.stop();
			mediaRecorder.start();
		}, 1000);
	});

	socket.on("sendVoice", function (arrayBuffer) {
		const blob = new Blob([arrayBuffer], {"type": "audio/ogg; codecs=opus"});
		const audio = document.createElement("audio");
		audio.src = window.URL.createObjectURL(blob);
		audio.play();
	});
}
