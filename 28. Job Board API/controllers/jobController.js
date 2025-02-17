import Job from "../models/Job.js";
import User from "../models/User.js";

// Create job
export const postJob = async (req, res) => {
  try {
    if (req.user.role !== "employer")
      return res.status(403).json({ error: "Only employers can post jobs" });

    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Apply for job
export const applyForJob = async (req, res) => {
  try {
    if (req.user.role !== "job-seeker")
      return res.status(403).json({ error: "Only job seekers can apply" });

    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    job.applicants.push(req.user.id);
    await job.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { appliedJobs: job._id },
    });

    res.json({ message: "Successfully applied!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const { category, location, search } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (location) filters.location = location;
    if (search) filters.title = new RegExp(search, "i");

    const jobs = await Job.find(filters)
      .populate("postedBy", "name")
      .populate("applicants", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Top 5 Job Categories
export const getTopCategories = async (req, res) => {
  try {
    const categories = await Job.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
