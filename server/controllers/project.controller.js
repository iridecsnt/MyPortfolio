// server/controllers/project.controller.js
import Project from "../models/project.model.js";

export async function getAll(_req, res) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Get projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getById(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    console.error("Get project error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createOne(req, res) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error("Create project error:", err);
    res.status(400).json({ message: "Bad request" });
  }
}

export async function updateById(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    console.error("Update project error:", err);
    res.status(400).json({ message: "Bad request" });
  }
}

export async function removeById(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete project error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function removeAll(_req, res) {
  try {
    await Project.deleteMany({});
    res.json({ message: "All projects deleted" });
  } catch (err) {
    console.error("Delete all projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
