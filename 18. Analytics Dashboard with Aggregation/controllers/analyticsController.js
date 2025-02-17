import Sales from "../models/Sales.js";
import connectDB from "../db.js";

connectDB();

// Get Total Sales Revenue
export const getSalesSummary = async (req, res) => {
  try {
    const totalRevenue = await Sales.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    res.json(totalRevenue[0] || { totalRevenue: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Top 5 Selling Products
export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Sales.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Top 3 Highest-Spending Customers
export const getTopCustomers = async (req, res) => {
  try {
    const topCustomers = await Sales.aggregate([
      { $group: { _id: "$customer", totalSpent: { $sum: "$totalAmount" } } },
      { $sort: { totalSpent: -1 } },
      { $limit: 3 },
    ]);
    res.json(topCustomers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Monthly Sales Trends
export const getSalesTrends = async (req, res) => {
  try {
    const salesTrends = await Sales.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    res.json(salesTrends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
