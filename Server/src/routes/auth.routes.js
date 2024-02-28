import express from "express";

import { login, logout, profile, verifyToken } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validationToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);

export default router;