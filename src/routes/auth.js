import express from "express";
import passport from "passport";
import { googleLogin, setRole, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleLogin
);
router.post("/role", authMiddleware, setRole);
router.get("/logout", logout);

export default router;
