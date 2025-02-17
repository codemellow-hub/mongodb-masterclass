import express from "express";
import { postJob, applyForJob, getJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, postJob); // Only employers can post
router.post("/:jobId/apply", protect, applyForJob); // Only job seekers can apply
router.get("/", getJobs); // Open to all

export default router;
