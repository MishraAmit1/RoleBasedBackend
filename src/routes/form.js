import express from "express";
import {
  createForm,
  getForms,
  updateForm,
  deleteForm,
} from "../controllers/formController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createForm);
router.get("/", authMiddleware, getForms);
router.put("/:id", authMiddleware, adminMiddleware, updateForm);
router.delete("/:id", authMiddleware, adminMiddleware, deleteForm);

export default router;
