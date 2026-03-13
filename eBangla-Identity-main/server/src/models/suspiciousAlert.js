import mongoose from "mongoose";

const suspiciousAlertSchema = new mongoose.Schema(
  {
    citizen: {
      type: Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
      index: true,
    },
    log: { type: Schema.Types.ObjectId, ref: "AccessLog", required: true },

    alertType: {
      type: String,
      enum: [
        "unusual_location",
        "off_hours_access",
        "bulk_download",
        "repeated_denied_access",
        "expired_permission_attempt",
        "multiple_agency_simultaneous",
        "other",
      ],
      required: true,
    },
    description: { type: String, required: true },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    // ── Resolution ────────────────────────────────────────────
    status: {
      type: String,
      enum: ["open", "under_review", "resolved", "false_positive"],
      default: "open",
      index: true,
    },
    resolvedBy: String,
    resolvedAt: Date,
    resolutionNote: String,

    // ── Notifications ─────────────────────────────────────────
    notifiedCitizen: { type: Boolean, default: false },
    notifiedAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const SuspiciousAlert = mongoose.model("SuspiciousAlert", suspiciousAlertSchema);

export default SuspiciousAlert;
