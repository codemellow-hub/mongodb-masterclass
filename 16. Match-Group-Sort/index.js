import connectDB from "./db.js";
import Sales from "./models/Sales.js";

const runAggregation = async () => {
  await connectDB();

  try {
    // Filter with $match
    // const salesData = await Sales.aggregate([
    //   { $match: { totalAmount: { $gte: 100 } } },
    // ]);
    // console.log("📌 Sales Above $100:", salesData);

    // Group with $group
    // const salesData = await Sales.aggregate([
    //   { $group: { _id: "$customer", totalSpent: { $sum: "$totalAmount" } } },
    // ]);
    // console.log("📌 Total Spending Per Customer:", salesData);

    // Sort with $sort
    // const salesData = await Sales.aggregate([
    //   { $group: { _id: "$customer", totalSpent: { $sum: "$totalAmount" } } },
    //   { $sort: { totalSpent: -1 } },
    // ]);
    // console.log("📌 Customers Sorted by Spending:", salesData);

    // Joins with $lookup
    // const salesData = await Sales.aggregate([
    //   { $unwind: "$items" },
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "items.productId",
    //       foreignField: "_id",
    //       as: "productDetails",
    //     },
    //   },
    // ]);
    // console.log("📌 Sales with Product Details:", salesData);

    // Flatten arrays with $unwind
    const salesData = await Sales.aggregate([{ $unwind: "$items" }]);
    console.log("📌 Sales Data Unwound:", salesData);
  } catch (error) {
    console.error("❌ Error Running Aggregation:", error);
  }
};

runAggregation();
