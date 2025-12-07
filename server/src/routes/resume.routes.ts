import { Router } from "express";
import {
  createResume,
  getUserResumes,
  updateResume,
  deleteResume,
} from "../controllers/resume.controller";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/", requireAuth, getUserResumes);
router.post("/", requireAuth, createResume);
router.put("/:id", requireAuth, updateResume);
router.delete("/:id", requireAuth, deleteResume);

export default router;
