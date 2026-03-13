import express from "express";
import { getMyMedicalRecords } from "../controllers/medicalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMyMedicalRecords);

export default router;
