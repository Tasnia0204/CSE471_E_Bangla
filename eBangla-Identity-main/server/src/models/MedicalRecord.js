import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AllergySchema = new Schema(
  {
    substance: { type: String, required: true },
    reaction: String,
    severity: { type: String, enum: ["mild", "moderate", "severe"] },
  },
  { _id: false },
);

const VaccinationSchema = new Schema(
  {
    vaccineName: { type: String, required: true },
    doseNumber: { type: Number, required: true },
    dateAdministered: { type: Date, required: true },
    hospital: String,
    nextDueDate: Date,
  },
  { _id: false },
);

const DiagnosisSchema = new Schema(
  {
    icdCode: String, // ICD-10/11 code
    description: { type: String, required: true },
    diagnosedAt: { type: Date, required: true },
    hospital: String,
    doctorName: String,
    status: {
      type: String,
      enum: ["active", "resolved", "chronic"],
      default: "active",
    },
  },
  { _id: false },
);

const MedicalRecordSchema = new Schema(
  {
    citizen: {
      type: Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    height: Number, // cm
    weight: Number, // kg
    disabilities: [String],

    allergies: [AllergySchema],
    vaccinations: [VaccinationSchema],
    diagnoses: [DiagnosisSchema],

    // ── Access control ───────────────────────────────────────
    // isConfidential: { type: Boolean, default: false }, // citizen can mark sensitive
  },
  { timestamps: true },
);

MedicalRecordSchema.index({ citizen: 1 }, { unique: true });

export default model("MedicalRecord", MedicalRecordSchema);
