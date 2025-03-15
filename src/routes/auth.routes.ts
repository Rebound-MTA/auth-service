import express from "express";
import {
  register,
  login,
  validateToken,
  getUserRoles,
  resetPasswordRequest,
  resetPassword,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/validate-token", validateToken);
router.get("/roles/:userId", getUserRoles);
router.post("/reset-password", resetPasswordRequest);
router.post("/new-password", resetPassword);

export default router;
