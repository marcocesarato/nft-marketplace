import type {NextApiRequest} from "next";
import {Server, Socket} from "socket.io";

import {NextApiResponseWithSocket} from "@app/types";

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
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
		log("User connected", socket.id);

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
			rooms[room].occupants[socket.id] = joinedTime;
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
	};

	// Define actions inside
	io.on("connection", onConnection);

	log("Setting up socket");
	res.end();
}
