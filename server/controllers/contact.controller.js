// server/controllers/contact.controller.js
import Contact from "../models/contact.model.js";

export async function getAll(_req, res) {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error("Get contacts error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getById(req, res) {
  try {
    const item = await Contact.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    console.error("Get contact error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createOne(req, res) {
  try {
    const item = await Contact.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error("Create contact error:", err);
    res.status(400).json({ message: "Bad request" });
  }
}

export async function updateById(req, res) {
  try {
    const item = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    console.error("Update contact error:", err);
    res.status(400).json({ message: "Bad request" });
  }
}

export async function removeById(req, res) {
  try {
    const item = await Contact.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete contact error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function removeAll(_req, res) {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All contacts deleted" });
  } catch (err) {
    console.error("Delete all contacts error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
