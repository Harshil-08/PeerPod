import { Server } from "socket.io";
import Message from "./models/message.js";
import { authSocket } from "./middlewares/authSocket.js";

export const handleWebsocket = (httpServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: "http://localhost:5173",
			credentials: true,
		},
	});

	io.use(authSocket);

	io.on("connection", (socket) => {
		socket.on("joinRoom", (room) => {
			socket.join(room);
		});

		socket.on("sendMessage", async (messageData) => {
			const { content, contentType, channelType, replyTo, mentions } =
				messageData;

			try {
				const message = await Message.create({
					content,
					contentType,
					sender: socket.user.id,
					channelType,
					replyTo,
					mentions,
				});

				console.log(message);

				io.to(channelType).emit("newMessage", message);
			} catch (error) {
				console.log("Error saving message:", error.message);
			}
		});

		socket.on("fetchMessages", async (room) => {
			try {
				const messages = await Message.find({ channelType: room });
				socket.emit("messages", messages);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		});
	});
};
