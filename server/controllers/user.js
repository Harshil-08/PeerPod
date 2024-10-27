import User from "../models/user.js";

export const getUsers = async (req, res) => {
	const { role } = req.query;

	try {
		if (!role || role === "GENERAL") {
			const users = await User.find({});
			return res.status(200).json({
				message: "Users fetched successfully",
				data: users,
				success: true,
			});
		}

		const users = await User.find({ role });

		return res.status(200).json({
			message: `Users with role ${role} fetched successfully`,
			data: users,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

export const getUser = async (req, res) => {
	const { id } = req.params;

	try {
		if (!id) {
			return res.status(400).json({
				message: "User id is missing",
				success: false,
			});
		}

		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				message: `User with id ${id} not found`,
				success: false,
			});
		}

		res.status(200).json({
			message: `User with id ${id} fetched successfully`,
			data: user,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;

	try {
		if (!id) {
			return res.status(400).json({
				message: "User id not found",
				success: false,
			});
		}

		const user = await User.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true, runValidators: true },
		);

		if (!user) {
			return res.status(404).json({
				message: `User with id ${id} not found`,
				success: false,
			});
		}

		const { password, role, ...updatedUser } = user._doc;

		res.status(200).json({
			message: `User with id ${id} updated successfully`,
			data: updatedUser,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: "Internal server error",
			success: true,
		});
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.body;

	try {
		if (!id) {
			return res.status(400).json({
				message: "User id not found",
				success: false,
			});
		}

		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).json({
				message: `User with id ${id} not found`,
				success: false,
			});
		}

		res.status(200).json({
			message: `User with id ${id} deleted successfully`,
			data: user,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: "Internal server error",
			success: true,
		});
	}
};

export const getRole = async (req, res) => {
	const { id } = req.params;

	try {
		if (!id) {
			return res.status(400).json({
				message: "User id not found",
				success: false,
			});
		}

		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				message: `User with id ${id} not found`,
				success: false,
			});
		}

		res.status(200).json({
			message: `Role of user with id ${id} fetched successfully`,
			data: user.role,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: "Internal server error",
			success: true,
		});
	}
};
