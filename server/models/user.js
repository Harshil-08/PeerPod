import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: validator.isEmail,
				message: "Please provide a valid email!",
			},
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: "https://cdn-icons-png.freepik.com/128/3237/3237472.png",
		},
		role: {
			type: String,
			enum: ["FY", "SY", "TY", "BY", "ALUMNI", "FACULTY", "NO_ROLE"],
			default: "NO_ROLE",
			required: true,
		},
		description: {
			type: String,
		},
		links: {
			type: Object,
		},
		accessToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model("User", UserSchema);
export default User;
