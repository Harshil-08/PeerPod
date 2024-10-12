import { Router } from "express";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser).post(updateUser).delete(deleteUser);

export default router;
