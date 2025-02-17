import express from "express";
import { searchJobs } from "../controllers/jobController.js";

const router = express.Router();

router.get("/search", searchJobs); // Search jobs

export default router;
