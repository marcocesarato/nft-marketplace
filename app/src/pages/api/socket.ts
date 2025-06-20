import type {NextApiRequest} from "next";
import {getToken} from "next-auth/jwt";
import {Server, Socket} from "socket.io";

import {NextApiResponseWithSocket} from "@app/types";

async function socketRoute(req: NextApiRequest, res: NextApiResponseWithSocket) {
	const token = await getToken({req});

	if (!token || !token?.user) {
		res.status(401);
		res.end();
	}
	const log = (...args: any[]): void => {
		console.log("[socket]", ...args);
	};

	// It means that socket server was already initialised
	if (res.socket.server.io) {
		log("Already set up");
		res.end();
		return;
	}

	const io = new Server(res.socket.server);
	res.socket.server.io = io;

	const rooms = {};

	const onConnection = (socket: Socket) => {
		const socketId = socket.id;

		log("User connected", socketId);

		let curRoom = null;

		socket.on("joinRoom", (data) => {
			const {room} = data;

			if (!rooms[room]) {
				rooms[room] = {
					name: room,
					occupants: {},
				};
			}

			const joinedTime = Date.now();
			rooms[room].occupants[socket.id] = {joinedTime, muted: false};
			curRoom = room;

			log(`${socket.id} joined room ${room}`);
			socket.join(room);

			socket.emit("connectSuccess", {joinedTime});
			const occupants = rooms[room].occupants;
			io.in(curRoom).emit("occupantsChanged", {occupants});
		});

		socket.on("send", (data) => {
			io.to(data.to).emit("send", data);
		});

		socket.on("broadcast", (data) => {
			socket.broadcast.to(curRoom).emit("broadcast", data);
		});

		socket.on("disconnect", () => {
			log("Disconnection", socket.id, curRoom);
			if (rooms[curRoom]) {
				log("User disconnected", socket.id);

				delete rooms[curRoom].occupants[socket.id];
				const occupants = rooms[curRoom].occupants;
				socket.broadcast.to(curRoom).emit("occupantsChanged", {occupants});

				if (Object.keys(occupants).length === 0) {
					log("Everybody left room");
					delete rooms[curRoom];
				}
			}
		});

		socket.on("voice", function (data) {
			const occupants = rooms[curRoom]?.occupants ?? {};
			Object.keys(occupants).forEach((id) => {
				if (id !== socket.id && !occupants[id].muted)
					socket.in(curRoom).to(id).emit("audioStream", data);
			});
		});
	};

	// Define actions inside
	io.on("connection", onConnection);

	log("Setting up socket");
	res.end();
}

export default socketRoute;
