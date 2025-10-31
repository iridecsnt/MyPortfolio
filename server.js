//import express from "express";

import app from "./server/express.js";
import router from "./server/assets-router.js";
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";
import { requireAuth } from "./server/controllers/auth.controller.js";

import dotenv from "dotenv"; 
import mongoose from "mongoose"; 
import path from "path";
import { fileURLToPath } from "url";

// Ensure dotenv loads .env that sits beside server.js no matter the CWD
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

app.use("/src", router);
app.get("/", (req, res) => res.send("Welcome to My Profile Application"));

app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error(" Missing MONGO_URI in .env (next to server.js).");
  process.exit(1);
}


mongoose
  .connect(process.env.MONGO_URI, { dbName: "MyPortfolio" })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);

    app.get("/api/secure/profile", requireAuth, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});
app.use("/api", (_req, res) => res.status(404).json({ message: "Route not found" }));
  });

export default app;

