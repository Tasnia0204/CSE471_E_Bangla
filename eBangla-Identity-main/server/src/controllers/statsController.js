import MedicalRecord from "../models/MedicalRecord.js";
import PoliceRecord from "../models/PoliceRecord.js";
import TaxRecord from "../models/TaxRecord.js"; // 1. IMPORT THE TAX MODEL

// @desc    Get dashboard statistics for the logged-in user
// @route   GET /api/stats/dashboard
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch medical record summary
    const medicalRecord = await MedicalRecord.findOne({ citizen: userId });
    let medicalStats = {
      count: 0,
      bloodGroup: "Not set",
      lastUpdated: null,
    };

    if (medicalRecord) {
      medicalStats = {
        count: 
          (medicalRecord.diagnoses?.length || 0) + 
          (medicalRecord.allergies?.length || 0) + 
          (medicalRecord.vaccinations?.length || 0),
        bloodGroup: medicalRecord.bloodGroup || "Not set",
        lastUpdated: medicalRecord.updatedAt,
      };
    }

    // Fetch police record summary
    const policeRecord = await PoliceRecord.findOne({ citizen: userId });
    let policeStats = {
      count: 0,
      status: "Clear",
      lastUpdated: null,
    };

    if (policeRecord) {
      const activeCases = policeRecord.cases?.filter(c => 
        ["pending", "under_investigation"].includes(c.status)
      ).length || 0;

      policeStats = {
        count: policeRecord.cases?.length || 0,
        status: activeCases > 0 ? `${activeCases} Active Cases` : "Clear",
        lastUpdated: policeRecord.updatedAt,
      };
    }

    // 2. FETCH LATEST TAX RECORD
    const latestTaxRecord = await TaxRecord.findOne({ user: userId }).sort({ createdAt: -1 });
    let taxStats = {
      taxAmount: 0,
      fiscalYear: "N/A",
      lastUpdated: null,
    };

    if (latestTaxRecord) {
      taxStats = {
        taxAmount: latestTaxRecord.taxAmount || 0,
        fiscalYear: latestTaxRecord.fiscalYear || "N/A",
        lastUpdated: latestTaxRecord.updatedAt,
      };
    }

    // Family stats from req.user
    const familyStats = {
      count: req.user.familyMembers?.length || 0,
      lastUpdated: req.user.updatedAt,
    };

    // 3. ADD TAX TO THE JSON RESPONSE
    res.status(200).json({
      medical: medicalStats,
      police: policeStats,
      family: familyStats,
      tax: taxStats, 
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
};