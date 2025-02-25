import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
