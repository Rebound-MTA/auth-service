import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { sendResetPasswordEmail } from "../utils/mailer";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, roles: user.roles },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: verified });
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export const getUserRoles = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ roles: user.roles });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

export const resetPasswordRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    await sendResetPasswordEmail(email, token);
    return res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Reset password request error:", error);
    return res
      .status(500)
      .json({ error: "Failed to process password reset request" });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token, newPassword } = req.body;

    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (!decoded.userId)
      return res.status(400).json({ error: "Invalid token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

    return res.json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(400).json({ error: "Invalid or expired token" });
  }
};
