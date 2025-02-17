import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser); // Create user
router.get("/", getUsers); // Get all users
router.put("/:id", updateUser); // Update user
router.delete("/:id", deleteUser); // Delete user

export default router;
