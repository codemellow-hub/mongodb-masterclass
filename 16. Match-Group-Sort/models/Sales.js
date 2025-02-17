import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  customer: String,
  items: [{ productId: Number, quantity: Number, price: Number }],
  totalAmount: Number,
  date: Date,
});

const Sales = mongoose.model("Sales", salesSchema);
export default Sales;
