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

export const editMessage = async (messageData) => {
	const io = getIo();
	const { id, content } = messageData;

	try {
		const updatedMessage = await Message.findByIdAndUpdate(
			{ _id: id },
			{ content },
			{ new: true },
		).populate({
			path: "sender",
			select: "profilePicture username",
		});

		io.to(updatedMessage.channelType).emit("messageEdited", updatedMessage);
	} catch (error) {
		console.error("Error editing message:", error.message);
	}
};

export const deleteMessage = async (socket, messageId) => {
	const io = getIo();

	try {
		const message = await Message.findById(messageId).populate("sender");
		if (
			message.sender._id.toString() !== socket.user.id &&
			socket.user.role !== "FACULTY"
		) {
			return socket.emit("error", {
				message: "Unauthorized to delete this message",
			});
		}

		const deletedMessage = await Message.findByIdAndUpdate(
			messageId,
			{ deleted: true },
			{ new: true },
		).populate({
			path: "sender",
			select: "profilePicture username",
		});

		io.to(deletedMessage.channelType).emit(
			"messageDeleted",
			deletedMessage,
		);
	} catch (error) {
		console.error("Error deleting message:", error.message);
	}
};
