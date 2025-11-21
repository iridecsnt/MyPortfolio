// server/routes/contact.routes.js
import { Router } from "express";
import {
  getAll,
  getById,
  createOne,
  updateById,
  removeById,
  removeAll,
} from "../controllers/contact.controller.js";
import { requireAuth, requireAdmin } from "../controllers/auth.controller.js";

const router = Router();

// Public submit
router.post("/", createOne);

// Admin-only read/manage
router.get("/", requireAuth, requireAdmin, getAll);
router.get("/:id", requireAuth, requireAdmin, getById);
router.put("/:id", requireAuth, requireAdmin, updateById);
router.delete("/:id", requireAuth, requireAdmin, removeById);
router.delete("/", requireAuth, requireAdmin, removeAll);

export default router;
