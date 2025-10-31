import User from "../models/user.model.js";

export const getAll = async (_, res) => res.json(await User.find().lean());

export const getById = async (req, res) => {
  const doc = await User.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "User not found" });
  res.json(doc);
};

export const createOne = async (req, res) =>
  res.status(201).json(await User.create(req.body));

export const updateById = async (req, res) => {
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!doc) return res.status(404).json({ message: "User not found" });
  res.json(doc);
};

export const removeById = async (req, res) => {
  const doc = await User.findByIdAndDelete(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "User not found" });
  res.json({ deleted: true, id: req.params.id });
};

export const removeAll = async (_req, res) => {
  const { deletedCount } = await User.deleteMany({});
  res.json({ deletedCount });
};
