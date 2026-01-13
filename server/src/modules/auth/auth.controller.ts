import { Request, Response } from "express";
import { createUser, getUserByEmail } from "./auth.db";
import { hashPassword, comparePassword, generateToken } from "./auth.utils";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const existing = await getUserByEmail(email);
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const passwordHash = await hashPassword(password);
    const user = await createUser(email, username, passwordHash);

    const token = generateToken({ userId: user.id });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const valid = await comparePassword(password, user.password_hash);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken({ userId: user.id });
    res.json({
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
