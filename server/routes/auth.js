import { Router } from "express";
import { signin, signup, signout, googleAuth } from "../controllers/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.post("/signout", signout);

export default router;
