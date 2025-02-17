import express from "express";
import {
  getSalesSummary,
  getTopProducts,
  getTopCustomers,
  getSalesTrends,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/summary", getSalesSummary);
router.get("/top-products", getTopProducts);
router.get("/top-customers", getTopCustomers);
router.get("/sales-trends", getSalesTrends);

export default router;
