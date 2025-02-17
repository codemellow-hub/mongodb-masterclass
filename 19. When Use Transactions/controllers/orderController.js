import mongoose from "mongoose";
import User from "../models/User.js";
import Order from "../models/Order.js";
import connectDB from "../db.js";

connectDB();

// Process Order
export const processOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, productId, quantity, totalAmount } = req.body;

    // Step 1: Deduct money from user wallet
    const user = await User.findOne({ _id: userId }).session(session);
    if (!user || user.walletBalance < totalAmount) {
      throw new Error("Insufficient balance");
    }

    await User.updateOne(
      { _id: userId },
      { $inc: { walletBalance: -totalAmount } },
      { session }
    );

    // Step 2: Create Order
    const order = await Order.create(
      [{ userId, productId, quantity, totalAmount, status: "Completed" }],
      { session }
    );

    // Step 3: Commit Transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};
