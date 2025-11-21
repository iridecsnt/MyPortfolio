// server/controllers/qualification.controller.js
import Qualification from "../models/qualification.model.js";

export async function getAll(_req, res) {
  try {
    const list = await Qualification.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error("Get qualifications error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getById(req, res) {
  try {
    const item = await Qualification.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    console.error("Get qualification error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createOne(req, res) {
  try {
    const item = await Qualification.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error("Create qualification error:", err);
    res.status(400).json({ message: "Bad request" });
  }
}

export async function updateById(req, res) {
  try {
    const item = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    console.error("Update qualification error:", err);
    res.status(400).json({ message: "Bad request" });
  }
}

export async function removeById(req, res) {
  try {
    const item = await Qualification.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete qualification error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function removeAll(_req, res) {
  try {
    await Qualification.deleteMany({});
    res.json({ message: "All qualifications deleted" });
  } catch (err) {
    console.error("Delete all qualifications error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
