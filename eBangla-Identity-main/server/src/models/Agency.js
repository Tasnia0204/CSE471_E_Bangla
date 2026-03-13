// ============================================================
// agency.model.js  —  Government agencies that request data
// ============================================================
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AgencySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    shortCode: { type: String, required: true, unique: true }, // e.g. "NBR", "CID"
    ministry: String,
    agencyType: {
      type: String,
      enum: [
        "police",
        "tax",
        "health",
        "judiciary",
        "immigration",
        "social_welfare",
        "other",
      ],
      required: true,
    },
    contactEmail: String,
    contactPhone: String,
    isActive: { type: Boolean, default: true },
    apiKeyHash: String, // hashed API key for server-to-server requests
  },
  { timestamps: true },
);

export default model("Agency", AgencySchema);
