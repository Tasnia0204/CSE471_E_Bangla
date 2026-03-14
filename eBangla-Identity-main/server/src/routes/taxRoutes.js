import express from "express";
const router = express.Router();

// Import the controller functions
import { createTaxRecord, getTaxRecords } from "../controllers/taxController.js";

import { protect } from "../middleware/authMiddleware.js";

// Routes
// POST: http://localhost:5000/api/tax/submit
router.post("/submit", protect, createTaxRecord);

// GET: http://localhost:5000/api/tax
router.get("/", protect, getTaxRecords);

export default router;
