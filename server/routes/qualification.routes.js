// server/routes/qualification.routes.js
import { Router } from "express";
import {
  getAll,
  getById,
  createOne,
  updateById,
  removeById,
  removeAll,
} from "../controllers/qualification.controller.js";
import { requireAuth, requireAdmin } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);

router.post("/", requireAuth, requireAdmin, createOne);
router.put("/:id", requireAuth, requireAdmin, updateById);
router.delete("/:id", requireAuth, requireAdmin, removeById);
router.delete("/", requireAuth, requireAdmin, removeAll);

export default router;
