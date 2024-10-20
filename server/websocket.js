import { Server } from "socket.io";
import Message from "./models/message.js";
import { authSocket } from "./middlewares/authSocket.js";

export const handleWebsocket = (httpServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: [
				"http://localhost:5173",
				"http://localhost:5174",
				"http://127.0.0.1:8080",
			],
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

				const messageWithUser = await Message.findById({
					_id: message._id,
				}).populate({
					path: "sender",
					select: "profilePicture username",
				});

				io.to(channelType).emit("newMessage", messageWithUser);
			} catch (error) {
				console.log("Error saving message:", error.message);
			}
		});

		socket.on("fetchMessages", async (room) => {
			try {
				const messages = await Message.find({ channelType: room }).populate({
					path: "sender",
					select: "profilePicture username",
				});
				socket.emit("messages", messages);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		});
	});
};
