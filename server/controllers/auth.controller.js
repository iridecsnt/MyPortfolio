import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const EXPIRES_IN = "1h";

export async function signin(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email: email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, { expiresIn: EXPIRES_IN });
  res.json({ token: token });
}

export function signout(_req, res) {
  res.json({ message: "Signed out" });
}

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const parts = auth.split(" ");
  const token = parts.length === 2 ? parts[1] : null;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (_err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}
