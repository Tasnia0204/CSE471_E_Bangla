import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import medicalRoutes from "./routes/medicalRoutes.js";
import policeRoutes from "./routes/policeRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import taxRoutes from "./routes/taxRoutes.js"; // <--- UNCOMMENTED THIS

const app = express();

// CORS middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/medical", medicalRoutes);
app.use("/api/police", policeRoutes);
app.use("/api/tax", taxRoutes); // <--- UNCOMMENTED THIS
app.use("/api/stats", statsRoutes);

export default app;