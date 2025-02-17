import Job from "../models/Job.js";
import connectDB from "../db.js";

connectDB();

// Full-Text & Partial Search
export const searchJobs = async (req, res) => {
  try {
    const { query, location, category } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Full-Text Search (Exact match ranking)
    const fullTextResults = await Job.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // Partial (Fuzzy) Search using Regex (Autocomplete)
    const regexResults = await Job.find({
      title: { $regex: query, $options: "i" },
    });

    // Apply filters for location & category if provided
    let results = [
      ...new Map(
        [...fullTextResults, ...regexResults].map((job) => [
          job._id.toString(),
          job,
        ])
      ).values(),
    ];

    if (location) {
      results = results.filter(
        (job) => job.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (category) {
      results = results.filter(
        (job) => job.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
