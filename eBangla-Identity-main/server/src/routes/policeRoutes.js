import express from "express";
import { getMyPoliceRecords } from "../controllers/policeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMyPoliceRecords);

export default router;
