import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authSocket = async (socket, next) => {
	const cookie = socket.request.headers.cookie;

	if (!cookie) return next(new Error("Unauthenticated."));

	const token = cookie
		.split("; ")
		.find((row) => row.startsWith("access_token="))
		.split("=")[1];

	try {
		const user = await verifyToken(token);
		socket.user = user;
		next();
	} catch (error) {
		next(new Error(error.message));
	}
};

const verifyToken = async (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
			if (error) return reject(error);
			const currentUser = await User.findById(user.id);
			if (!currentUser || currentUser.accessToken !== token) {
				return reject(new Error("Session expired."));
			}
			resolve(currentUser);
		});
	});
};
