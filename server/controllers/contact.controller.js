import Contact from "../models/contact.model.js";

export const getAll = async (req, res) => {
  const docs = await Contact.find().lean();
  res.json(docs);
};

export const getById = async (req, res) => {
  const doc = await Contact.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "Contact not found" });
  res.json(doc);
};

export const createOne = async (req, res) => {
  const doc = await Contact.create(req.body);
  res.status(201).json(doc);
};

export const updateById = async (req, res) => {
  const doc = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!doc) return res.status(404).json({ message: "Contact not found" });
  res.json(doc);
};

export const removeById = async (req, res) => {
  const doc = await Contact.findByIdAndDelete(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "Contact not found" });
  res.json({ deleted: true, id: req.params.id });
};

export const removeAll = async (req, res) => {
  const { deletedCount } = await Contact.deleteMany({});
  res.json({ deletedCount });
};
