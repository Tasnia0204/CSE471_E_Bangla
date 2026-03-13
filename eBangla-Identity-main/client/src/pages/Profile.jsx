import React, { useState, useEffect } from "react";
import axios from "axios";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SideMenu from "../components/SideMenu";
import UserInfoCard from "../components/dashboard/UserInfoCard";
import RecordCard from "../components/dashboard/RecordCard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PaymentsIcon from "@mui/icons-material/Payments";

export default function Profile({ user, setUser }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stats/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <SideMenu user={user} />

        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
            p: 3,
          })}
        >
          {user && !user.isProfileComplete && (
            <Box
              sx={{
                bgcolor: "warning.light",
                p: 2,
                mb: 2,
                borderRadius: 1,
                color: "warning.contrastText",
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Action Required: Please complete your profile to access all
                features.
              </Typography>
            </Box>
          )}
          <Stack
            spacing={3}
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              mt: { xs: 8, md: 2 },
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 1, fontWeight: 700, color: "primary.main" }}
            >
              My Profile
            </Typography>

            <UserInfoCard user={user} setUser={setUser} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <RecordCard
                  title="Medical Records"
                  value={stats?.medical ? `${stats.medical.bloodGroup} | ${stats.medical.count} Records` : "..."}
                  icon={<MedicalServicesIcon />}
                  lastUpdated={formatDate(stats?.medical?.lastUpdated)}
                  color="error.main"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <RecordCard
                  title="Police Records"
                  value={stats?.police ? stats.police.status : "..."}
                  icon={<LocalPoliceIcon />}
                  lastUpdated={formatDate(stats?.police?.lastUpdated)}
                  color="primary.main"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <RecordCard
                  title="Family Records"
                  value={stats?.family ? `${stats.family.count} Members` : "..."}
                  icon={<FamilyRestroomIcon />}
                  lastUpdated={formatDate(stats?.family?.lastUpdated)}
                  color="success.main"
                />
              </Grid>
              
              {/* MODIFIED: Tax Summary Card now pulls from the calculated stats */}
              <Grid item xs={12} md={3}>
                <RecordCard
                  title="Tax Summary"
                  value={
                    stats?.tax 
                      ? `৳ ${stats.tax.taxAmount.toLocaleString()} Tax` 
                      : "৳ 0 Calculated"
                  }
                  icon={<PaymentsIcon />}
                  lastUpdated={
                    stats?.tax?.lastUpdated 
                      ? `Year: ${stats.tax.fiscalYear}` 
                      : "No submissions"
                  }
                  color="warning.main"
                />
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </>
  );
}