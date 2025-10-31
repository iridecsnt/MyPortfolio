import Qualification from "../models/qualification.model.js";

export const getAll = async (_, res) =>
  res.json(await Qualification.find().lean());

export const getById = async (req, res) => {
  const doc = await Qualification.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "Qualification not found" });
  res.json(doc);
};

export const createOne = async (req, res) =>
  res.status(201).json(await Qualification.create(req.body));

export const updateById = async (req, res) => {
  const doc = await Qualification.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!doc) return res.status(404).json({ message: "Qualification not found" });
  res.json(doc);
};

export const removeById = async (req, res) => {
  const doc = await Qualification.findByIdAndDelete(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "Qualification not found" });
  res.json({ deleted: true, id: req.params.id });
};

export const removeAll = async (_req, res) => {
  const { deletedCount } = await Qualification.deleteMany({});
  res.json({ deletedCount });
};
