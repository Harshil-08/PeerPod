import { Server } from "socket.io";
import { authSocket } from "./middlewares/authSocket.js";
import { joinRoom } from "./controllers/room.js";
import {
	editMessage,
	fetchMessages,
	sendMessage,
} from "./controllers/message.js";

let io;

export const handleWebsocket = (httpServer) => {
	io = new Server(httpServer, {
		cors: {
			origin: [
				"http://localhost:5173",
				"http://localhost:3000",
				"https://peerpod-hk5e.onrender.com",
			],
			credentials: true,
		},
	});

	io.use(authSocket);

	io.on("connection", (socket) => {
		socket.on("joinRoom", (room) => joinRoom(socket, room));
		socket.on("fetchMessages", (room) => fetchMessages(socket, room));
		socket.on("sendMessage", (messageData) => sendMessage(socket, messageData));
		socket.on("editMessage", (messageData) => editMessage(messageData));
	});
};

export const getIo = () => io;
