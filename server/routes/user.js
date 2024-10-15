import { Router } from "express";

import {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	getRole,
} from "../controllers/user.js";

const router = Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser).post(updateUser).delete(deleteUser);
router.route("/role/:id").get(getRole);

export default router;
