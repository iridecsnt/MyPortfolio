import Project from "../models/project.model.js";

export const getAll = async (_, res) => res.json(await Project.find().lean());
export const getById = async (req, res) => {
  const doc = await Project.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "Project not found" });
  res.json(doc);
};
export const createOne = async (req, res) =>
  res.status(201).json(await Project.create(req.body));
export const updateById = async (req, res) => {
  const doc = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!doc) return res.status(404).json({ message: "Project not found" });
  res.json(doc);
};
export const removeById = async (req, res) => {
  const doc = await Project.findByIdAndDelete(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "Project not found" });
  res.json({ deleted: true, id: req.params.id });
};
export const removeAll = async (_req, res) => {
  const { deletedCount } = await Project.deleteMany({});
  res.json({ deletedCount });
};
