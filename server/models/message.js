import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		contentType: {
			type: String,
			enum: ["TEXT", "OTHER"],
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		channelType: {
			type: String,
			enum: ["GENERAL", "FY", "SY", "TY", "BY", "ALUMNI", "FACULTY"],
			required: true,
		},
		replyTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		mentions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		deleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
