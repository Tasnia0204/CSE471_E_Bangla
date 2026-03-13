// ============================================================
// policeRecord.model.js  —  Module 1: Sajid
// Criminal / police history linked to a citizen
// ============================================================
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CaseSchema = new Schema(
  {
    caseNumber: { type: String, required: true },
    crimeType: { type: String, required: true }, // e.g. "Theft", "Fraud"
    description: String,
    filedAt: { type: Date, required: true },
    closedAt: Date,
    court: String,
    verdict: String,
    station: String, // Police station name
    status: {
      type: String,
      enum: [
        "pending",
        "under_investigation",
        "closed",
        "acquitted",
        "convicted",
      ],
      default: "pending",
    },
  },
  { _id: false },
);

const PoliceRecordSchema = new Schema(
  {
    citizen: {
      type: Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },

    cases: [CaseSchema],
  },
  { timestamps: true },
);

PoliceRecordSchema.index({ citizen: 1 }, { unique: true });

export default model("PoliceRecord", PoliceRecordSchema);
