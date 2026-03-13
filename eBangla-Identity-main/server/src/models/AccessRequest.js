// ============================================================
// accessRequest.model.js  —  Module 3, Member 1 & 2
// Government agencies request data; citizens approve/deny.
// Temporary permissions auto-expire.
// ============================================================
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AccessRequestSchema = new Schema(
  {
    // ── Parties ───────────────────────────────────────────────
    citizen: { type: Schema.Types.ObjectId, ref: "Citizen", required: true },
    requestingAgency: {
      agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true },
      agencyName: { type: String, required: true },
      officerName: String,
      officerContact: String,
    },

    // ── What is being requested ───────────────────────────────
    dataModules: [
      {
        type: String,
        enum: [
          "medical",
          "police",
          "family_registry",
          "property_tax",
          "income_tax",
          "full_profile",
        ],
      },
    ],
    purposeCode: {
      type: String,
      enum: [
        "law_enforcement",
        "court_order",
        "social_welfare",
        "financial_audit",
        "border_control",
        "employment_verification",
        "other",
      ],
      required: true,
    },
    purposeDescription: String,

    // ── Citizen response (Member 1) ───────────────────────────
    status: {
      type: String,
      enum: ["pending", "approved", "denied", "expired", "revoked"],
      default: "pending",
      index: true,
    },
    decidedAt: Date,
    citizenNote: String, // optional message from citizen on approve/deny

    // ── Temporary permission details (Member 2) ───────────────
    accessDuration: { type: Number }, // minutes
    expiresAt: { type: Date, index: true }, // TTL-like for auto-expiration
    isRevoked: { type: Boolean, default: false },
    revokedAt: Date,

    // ── Request urgency ───────────────────────────────────────
    urgencyLevel: {
      type: String,
      enum: ["normal", "urgent", "court_mandated"],
      default: "normal",
    },
  },
  { timestamps: true },
);

AccessRequestSchema.index({ citizen: 1, status: 1 });
AccessRequestSchema.index({ "requestingAgency.agencyId": 1 });
// MongoDB TTL index can auto-expire documents, but here we track it in status instead
// so records are kept for audit. Use a scheduled job to mark "approved" → "expired".

export default model("AccessRequest", AccessRequestSchema);
