import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  smartNID: {
    type: String,
    required: true,
  },
});

const citizenSchema = new mongoose.Schema(
  {
    nid: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    address: {
      type: {
        division: { type: String, required: false },
        district: { type: String, required: false },
        upazilla: { type: String, required: false },
        village: { type: String, required: false },
      },
      required: false,
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "widowed"],
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    yearlyIncome: {        // <--- ADDED THIS FIELD
      type: Number,
      required: false,
      default: 0,
    },
    passport: {
      type: String,
      required: false,
    },
    driving_license: {
      type: String,
      required: false,
      default: null,
    },
    familyMembers: [familyMemberSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Updated the virtual to include yearlyIncome in the completion check
citizenSchema.virtual("isProfileComplete").get(function () {
  return !!(
    this.nid &&
    this.dateOfBirth &&
    this.gender &&
    this.phone &&
    this.maritalStatus &&
    this.yearlyIncome !== undefined && // <--- ADDED TO CHECK
    this.address &&
    this.address.division &&
    this.address.district &&
    this.address.upazilla &&
    this.address.village
  );
});

const Citizen = mongoose.model("Citizen", citizenSchema);

export default Citizen;