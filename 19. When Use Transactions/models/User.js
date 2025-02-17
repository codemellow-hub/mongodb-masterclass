import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: [String], default: [] },
  experience: { type: Number, default: 0 },
  bio: { type: String },
  walletBalance: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

export default User;
