import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  description: { type: String },
  category: { type: String, required: true },
});

// Create text index for full-text search
jobSchema.index({ title: "text", description: "text", company: "text" });

const Job = mongoose.model("Job", jobSchema);
export default Job;
