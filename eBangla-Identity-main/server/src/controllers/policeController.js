import PoliceRecord from "../models/PoliceRecord.js";

// @desc    Get current user's police records
// @route   GET /api/police/me
// @access  Private
export const getMyPoliceRecords = async (req, res) => {
  try {
    const record = await PoliceRecord.findOne({ citizen: req.user._id });

    if (!record) {
      return res.status(404).json({ message: "Police records not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching police records:", error);
    res.status(500).json({ message: "Server error while fetching police records" });
  }
};
