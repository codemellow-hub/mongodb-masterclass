import mongoose from "mongoose";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import connectDB from "../db.js";

connectDB();

// Process Payment
export const processPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, productId, quantity } = req.body;

    // 1. Fetch User & Product
    const user = await User.findOne({ _id: userId }).session(session);
    const product = await Product.findOne({ _id: productId }).session(session);

    if (!user || !product) throw new Error("User or Product not found");

    const totalAmount = product.price * quantity;

    if (user.walletBalance < totalAmount)
      throw new Error("Insufficient balance");
    if (product.stock < quantity) throw new Error("Product out of stock");

    // 2. Deduct from User Wallet
    await User.updateOne(
      { _id: userId },
      { $inc: { walletBalance: -totalAmount } },
      { session }
    );

    // 3. Deduct Stock from Product
    await Product.updateOne(
      { _id: productId },
      { $inc: { stock: -quantity } },
      { session }
    );

    // 4. Create Order
    const order = await Order.create(
      [{ userId, productId, quantity, totalAmount, status: "Completed" }],
      { session }
    );

    // 5. Commit Transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Payment Successful!", order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};
