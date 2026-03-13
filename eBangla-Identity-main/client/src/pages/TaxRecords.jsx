import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Paper,
  TextField,
  CircularProgress,
  Divider,
  Alert,
  Snackbar
} from "@mui/material";
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';
import CalculateIcon from '@mui/icons-material/Calculate';

const TaxRecords = ({ user }) => {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [income, setIncome] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ open: false, text: "", severity: "success" });

  const years = Array.from({ length: 2026 - 2000 + 1 }, (_, i) => 2026 - i);

  // Fetch data from database
  const fetchTaxData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/tax?year=${selectedYear}`);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching tax data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxData();
  }, [selectedYear]);

  // Handle storing income information
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!income || income <= 0) {
      setMessage({ open: true, text: "Please enter a valid income amount.", severity: "error" });
      return;
    }

    try {
      const payload = {
        fiscalYear: selectedYear,
        totalIncome: Number(income)
      };
      
      await axios.post("http://localhost:5000/api/tax/submit", payload);
      setMessage({ open: true, text: "Tax information stored successfully!", severity: "success" });
      setIncome(""); // Clear input
      fetchTaxData(); // Refresh summary
    } catch (err) {
      setMessage({ open: true, text: "Failed to store information. Check if your server is running.", severity: "error" });
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", borderRadius: 4, overflow: "hidden", border: "1px solid #e5e7eb" }}>
        
        {/* Header - Blue Theme */}
        <Box sx={{ backgroundColor: "#05339C", p: 3, textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
            Income Tax Summary
          </Typography>
        </Box>

        {/* Input Form Section */}
        <Box component="form" onSubmit={handleFormSubmit} sx={{ p: 4, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Select Year</InputLabel>
            <Select
              value={selectedYear}
              label="Select Year"
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{ borderRadius: "20px" }}
            >
              {years.map((year) => <MenuItem key={year} value={year.toString()}>{year}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField
            label="Annual Income (BDT)"
            type="number"
            size="small"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            sx={{ minWidth: 200, "& .MuiOutlinedInput-root": { borderRadius: "20px" } }}
          />

          <Button 
            type="submit"
            variant="contained" 
            startIcon={<CalculateIcon />}
            sx={{ backgroundColor: "#05339C", borderRadius: "20px", px: 3, textTransform: "none", "&:hover": { backgroundColor: "#02206a" } }}
          >
            Submit Return
          </Button>
        </Box>

        <Divider />

        {/* Display Section */}
        <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}><CircularProgress sx={{ color: "#05339C" }} /></Box>
          ) : (
            <>
              <Box sx={{ border: "2px solid #05339C", borderRadius: 3, p: 3, backgroundColor: "#fff" }}>
                <Typography variant="h6" sx={{ color: "#05339C", fontWeight: "bold", borderBottom: "1px solid #e5e7eb", mb: 2 }}>
                  Income Summary ({selectedYear})
                </Typography>
                {records.length > 0 ? (
                   <Typography variant="h5" sx={{ fontWeight: 'bold' }}>৳ {records[0].totalIncome.toLocaleString()}</Typography>
                ) : (
                  <Typography sx={{ fontStyle: "italic", color: "gray" }}>No income reported for this year.</Typography>
                )}
              </Box>

              <Box sx={{ border: "2px solid #05339C", borderRadius: 3, p: 3, backgroundColor: "#fff" }}>
                <Typography variant="h6" sx={{ color: "#05339C", fontWeight: "bold", borderBottom: "1px solid #e5e7eb", mb: 2 }}>
                  Tax Calculation
                </Typography>
                {records.length > 0 ? (
                   <Box>
                     <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#d32f2f" }}>৳ {records[0].taxAmount.toLocaleString()}</Typography>
                     <Typography variant="caption">Status: {records[0].status}</Typography>
                   </Box>
                ) : (
                  <Typography sx={{ fontStyle: "italic", color: "gray" }}>Calculation details will appear after submission.</Typography>
                )}
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ p: 4, textAlign: "center", backgroundColor: "#fff" }}>
          <Button 
            variant="contained" 
            startIcon={<DownloadIcon />}
            sx={{ backgroundColor: "#05339C", borderRadius: "25px", px: 5, py: 1.5, textTransform: "none", fontSize: "1.1rem", "&:hover": { backgroundColor: "#02206a" } }}
          >
            Download Report
          </Button>
        </Box>
      </Paper>

      {/* Notifications */}
      <Snackbar open={message.open} autoHideDuration={4000} onClose={() => setMessage({ ...message, open: false })}>
        <Alert severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TaxRecords;