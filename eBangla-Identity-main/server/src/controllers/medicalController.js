import MedicalRecord from "../models/MedicalRecord.js";

// @desc    Get current user's medical records
// @route   GET /api/medical/me
// @access  Private
export const getMyMedicalRecords = async (req, res) => {
  try {
    const record = await MedicalRecord.findOne({ citizen: req.user._id });

    if (!record) {
      return res.status(404).json({ message: "Medical records not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching medical records:", error);
    res.status(500).json({ message: "Server error while fetching medical records" });
  }
};
