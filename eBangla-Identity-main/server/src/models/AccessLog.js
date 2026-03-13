import mongoose from "mongoose";

const accessLogSchema = new mongoose.Schema(
  {
    // ── Context ───────────────────────────────────────────────
    citizen: {
      type: Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
      index: true,
    },
    request: { type: Schema.Types.ObjectId, ref: "AccessRequest" }, // null = self-access

    // ── Actor ─────────────────────────────────────────────────
    actorType: {
      type: String,
      enum: ["citizen", "agency", "admin", "system"],
      required: true,
    },
    actorId: { type: Schema.Types.ObjectId, required: true }, // Citizen or Agency _id
    actorName: String,
    agencyName: String,

    // ── What was accessed ─────────────────────────────────────
    dataModule: {
      type: String,
      enum: [
        "medical",
        "police",
        "family_registry",
        "property_tax",
        "income_tax",
        "full_profile",
        "documents",
        "access_history",
      ],
      required: true,
    },
    action: {
      type: String,
      enum: ["view", "download", "export_pdf", "search", "update", "login"],
      required: true,
    },
    resourceId: String, // e.g. specific taxRecord _id or "profile"

    // ── Request metadata ──────────────────────────────────────
    ipAddress: String,
    userAgent: String,
    sessionId: String,
    outcome: {
      type: String,
      enum: ["success", "denied", "error"],
      default: "success",
    },
    errorMessage: String,

    // ── Suspicious activity flag (Member 4) ───────────────────
    isFlagged: { type: Boolean, default: false, index: true },
    flagReason: String, // e.g. "Accessed from unusual location"
    alertSent: { type: Boolean, default: false },
    alertSentAt: Date,
  },
  {
    timestamps: true,
    // Logs must be immutable — disable update operations at application layer
  },
);

const AccessLog = mongoose.model("AccessLog", accessLogSchema);

export default AccessLog;
