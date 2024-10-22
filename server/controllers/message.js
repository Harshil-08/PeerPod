import Message from "../models/message.js";
import { getIo } from "../websocket.js";

export const sendMessage = async (socket, messageData) => {
	const io = getIo();
	const { content, contentType, channelType, replyTo, mentions } = messageData;

	try {
		const message = await Message.create({
			content,
			contentType,
			sender: socket.user.id,
			channelType,
			replyTo,
			mentions,
		});

		const messageWithUser = await Message.findById(message._id).populate({
			path: "sender",
			select: "profilePicture username",
		});

		io.to(channelType).emit("newMessage", messageWithUser);
	} catch (error) {
		console.error("Error saving message:", error.message);
	}
};

export const fetchMessages = async (socket, room) => {
	try {
		const messages = await Message.find({ channelType: room }).populate({
			path: "sender",
			select: "profilePicture username",
		});

		socket.emit("messages", messages);
	} catch (error) {
		console.error("Error fetching messages:", error.message);
	}
};
