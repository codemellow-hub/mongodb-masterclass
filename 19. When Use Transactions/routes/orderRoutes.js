import express from "express";
import { processOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place-order", processOrder); // Secure order processing

export default router;
