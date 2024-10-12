import { Router } from "express";
import { root } from "../controllers/root.js";

const router = Router();

router.get("/", root);

export default router;
