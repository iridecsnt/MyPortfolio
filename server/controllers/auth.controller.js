import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const EXPIRES_IN = "1h";

export async function signin(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // include user info in the token payload
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

export function signout(_req, res) {
  res.json({ message: "Signed out" });
}

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const parts = auth.split(" ");
  const token = parts.length === 2 ? parts[1] : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (_err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}

export function requireAdmin(req, res, next) {
  // use requireAuth first to set req.user
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
}
