import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { check, validationResult } from "express-validator";

import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json({ message: "User authenticated!", user: req.user });
});

// Registration route with validation
router.post(
  "/register",
  [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
  registerUser
);

// Login route
router.post("/login", loginUser);

export default router;
