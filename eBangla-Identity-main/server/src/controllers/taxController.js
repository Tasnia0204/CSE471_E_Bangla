import TaxRecord from "../models/TaxRecord.js";

// Save new tax information
export const createTaxRecord = async (req, res) => {
  try {
    const { fiscalYear, totalIncome } = req.body;

    // 1. CRITICAL: Convert to Number to ensure math works
    const income = Number(totalIncome);

    if (isNaN(income)) {
      return res.status(400).json({ message: "Invalid income amount provided" });
    }

    // 2. Clearer Calculation Logic
    // 0% up to 350,000 | 5% on anything above that
    let calculatedTax = 0;
    if (income > 3500) {
      calculatedTax = (income - 3500) * 0.05;
    }

    // 3. Create the record with the calculated values
    const newRecord = new TaxRecord({
      user: req.user.id, // req.user comes from the 'protect' middleware
      fiscalYear,
      totalIncome: income,   // Store as a clean number
      taxAmount: calculatedTax, // Store as a clean number
      status: "Paid"
    });

    await newRecord.save();
    
    // Return the full record so the frontend can see the taxAmount immediately
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Tax Creation Error:", error);
    res.status(500).json({ message: "Failed to create tax record", error: error.message });
  }
};

// Fetch tax records for the logged-in user
export const getTaxRecords = async (req, res) => {
  try {
    const { year } = req.query;
    // req.user.id comes from your protect middleware
    const query = { user: req.user.id };
    
    if (year) {
      query.fiscalYear = year;
    }

    // Sort by most recent first
    const records = await TaxRecord.find(query).sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tax records", error: error.message });
  }
};