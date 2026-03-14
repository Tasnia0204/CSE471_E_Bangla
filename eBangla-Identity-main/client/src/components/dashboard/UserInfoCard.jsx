import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default function UserInfoCard({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nid: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    yearlyIncome: 0, // <--- 1. Added to state
    address: {
      division: "",
      district: "",
      upazilla: "",
      village: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        nid: user.nid || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: user.gender || "",
        maritalStatus: user.maritalStatus || "",
        phone: user.phone || "",
        yearlyIncome: user.yearlyIncome || 0, // <--- 2. Load from user data
        address: {
          division: user.address?.division || "",
          district: user.address?.district || "",
          upazilla: user.address?.upazilla || "",
          village: user.address?.village || "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
      );
      if (setUser) setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const displayUser = user || {
    name: "Unknown User",
    email: "[EMAIL_ADDRESS]",
    nid: "Not set",
    dateOfBirth: "Not set",
    gender: "Not set",
    phone: "Not set",
    yearlyIncome: 0,
  };

  return (
    <Card variant="outlined" sx={{ width: "100%", mb: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt={displayUser.name}
              src="/static/images/avatar/7.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              {isEditing ? (
                <TextField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  size="small"
                  sx={{ mb: 1 }}
                />
              ) : (
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {displayUser.name}{" "}
                  <VerifiedUserIcon
                    color="primary"
                    sx={{ verticalAlign: "middle", ml: 1 }}
                  />
                </Typography>
              )}
              <Typography color="text.secondary">
                {displayUser.email}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={
                    user?.isProfileComplete
                      ? "Verified Citizen"
                      : "Incomplete Profile"
                  }
                  color={user?.isProfileComplete ? "success" : "warning"}
                  size="small"
                />
              </Box>
            </Box>
          </Box>
          <Box>
            {isEditing ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  onClick={handleSave}
                  size="small"
                >
                  Save
                </Button>
                <Button
                  startIcon={<CancelIcon />}
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  size="small"
                  color="inherit"
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={() => setIsEditing(true)}
                size="small"
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              National ID (NID)
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.nid || "Not set"}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Date of Birth
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.dateOfBirth
                  ? new Date(displayUser.dateOfBirth).toLocaleDateString()
                  : "Not set"}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Gender
            </Typography>
            {isEditing ? (
              <TextField
                select
                fullWidth
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.gender || "Not set"}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Phone Number
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.phone || "Not set"}
              </Typography>
            )}
          </Grid>

          {/* 3. YEARLY INCOME FIELD ADDED HERE */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Yearly Income (BDT)
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                name="yearlyIncome"
                type="number"
                value={formData.yearlyIncome}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ৳ {displayUser.yearlyIncome?.toLocaleString() || "0"}
              </Typography>
            )}
          </Grid>

          {/* Address Fields */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Address
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Division
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                name="address.division"
                value={formData.address.division}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.address?.division || "Not set"}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              District
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                name="address.district"
                value={formData.address.district}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.address?.district || "Not set"}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Upazilla
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                name="address.upazilla"
                value={formData.address.upazilla}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.address?.upazilla || "Not set"}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Village
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                name="address.village"
                value={formData.address.village}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.address?.village || "Not set"}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Marital Status
            </Typography>
            {isEditing ? (
              <TextField
                select
                fullWidth
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
              </TextField>
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {displayUser.maritalStatus || "Not set"}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
