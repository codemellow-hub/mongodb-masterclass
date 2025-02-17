import connectDB from "./db.js";
import Sales from "./models/Sales.js";

const runAggregation = async () => {
  await connectDB();

  try {
    // Calculate total revenue
    // const totalRevenue = await Sales.aggregate([
    //   { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    // ]);
    // console.log("📌 Total Revenue:", totalRevenue[0] || { totalRevenue: 0 });

    // Top selling products
    // const topProducts = await Sales.aggregate([
    //   { $unwind: "$items" },
    //   {
    //     $group: {
    //       _id: "$items.productId",
    //       totalQuantity: { $sum: "$items.quantity" },
    //     },
    //   },
    //   { $sort: { totalQuantity: -1 } },
    //   { $limit: 5 },
    // ]);
    // console.log("📌 Top-Selling Products:", topProducts);

    // Highest spending customers
    // const topCustomers = await Sales.aggregate([
    //   { $group: { _id: "$customer", totalSpent: { $sum: "$totalAmount" } } },
    //   { $sort: { totalSpent: -1 } },
    //   { $limit: 3 },
    // ]);
    // console.log("📌 Top-Spending Customers:", topCustomers);

    // Sales trends over time
    const salesTrends = await Sales.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    console.log("📌 Monthly Sales Trends:", salesTrends);
  } catch (error) {
    console.error("❌ Error Running Aggregation:", error);
  }
};

runAggregation();
