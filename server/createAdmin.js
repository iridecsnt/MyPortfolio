import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected");

  const admin = new User({
    name: "Admin User",
    email: "dionisiobrianna@gmail.com",
    password: "newpassword123", // this will be hashed automatically
    role: "admin"
  });

  await admin.save();
  console.log("Admin created:", admin.email);

  process.exit();
}

main();
