import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Must be present
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Must be valid
  age: { type: Number, min: 18, max: 100 }, // Age between 18-100
  createdAt: { type: Date, default: Date.now }, // Auto-sets timestamp
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    },
  },
  zip: { type: String, match: /^[0-9]{5}$/ }, // ZIP code exactly 5 digits
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
