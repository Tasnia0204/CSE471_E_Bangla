import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Citizen from "../models/Citizen.js";
import MedicalRecord from "../models/MedicalRecord.js";
import PoliceRecord from "../models/PoliceRecord.js";

dotenv.config();

const seedData = async () => {
  try {
    dns.setServers(["8.8.8.8"]); // Use Google DNS to bypass local resolver issues
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // 1. Find a citizen to attach data to
    // We'll look for any citizen, or you can specify one
    const citizen = await Citizen.findOne();

    if (!citizen) {
      console.error("No citizen found in database. Please register a user first.");
      process.exit(1);
    }

    console.log(`Targeting citizen: ${citizen.name} (${citizen.email})`);

    // 2. Mock Medical Record Data
    const medicalData = {
      citizen: citizen._id,
      bloodGroup: "O+",
      height: 175,
      weight: 70,
      disabilities: ["None"],
      allergies: [
        { substance: "Peanuts", reaction: "Hives", severity: "moderate" },
        { substance: "Penicillin", reaction: "Anaphylaxis", severity: "severe" }
      ],
      vaccinations: [
        {
          vaccineName: "COVID-19 (Pfizer)",
          doseNumber: 1,
          dateAdministered: new Date("2021-06-15"),
          hospital: "Dhaka Medical College Hospital"
        },
        {
          vaccineName: "COVID-19 (Pfizer)",
          doseNumber: 2,
          dateAdministered: new Date("2021-07-15"),
          hospital: "Dhaka Medical College Hospital"
        },
        {
          vaccineName: "BCG",
          doseNumber: 1,
          dateAdministered: new Date("1995-01-10"),
          hospital: "District Hospital"
        }
      ],
      diagnoses: [
        {
          icdCode: "I10",
          description: "Essential (primary) hypertension",
          diagnosedAt: new Date("2023-01-20"),
          hospital: "Evercare Hospital",
          doctorName: "Dr. Rahman",
          status: "active"
        }
      ]
    };

    // Upsert Medical Record
    await MedicalRecord.findOneAndUpdate(
      { citizen: citizen._id },
      medicalData,
      { upsert: true, new: true }
    );
    console.log("Medical record seeded successfully.");

    // 3. Mock Police Record Data
    const policeData = {
      citizen: citizen._id,
      cases: [
        {
          caseNumber: "PR-2024-001",
          crimeType: "Traffic Violation",
          description: "Speeding on Airport Road",
          filedAt: new Date("2024-02-10"),
          station: "Uttara Police Station",
          status: "closed",
          verdict: "Fine Paid"
        },
        {
          caseNumber: "PR-2025-042",
          crimeType: "Identity Dispute",
          description: "Clarification required on property documents",
          filedAt: new Date("2025-11-20"),
          station: "Gulshan Police Station",
          status: "under_investigation"
        }
      ]
    };

    // Upsert Police Record
    await PoliceRecord.findOneAndUpdate(
      { citizen: citizen._id },
      policeData,
      { upsert: true, new: true }
    );
    console.log("Police record seeded successfully.");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
