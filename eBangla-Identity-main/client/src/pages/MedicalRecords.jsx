import React, { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import axios from "axios";

import SideMenu from "../components/SideMenu";
import DetailedRecordCard from "../components/dashboard/DetailedRecordCard";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealingIcon from "@mui/icons-material/Healing";
import VaccinationIcon from "@mui/icons-material/Vaccines";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import HeightIcon from "@mui/icons-material/Height";
import ScaleIcon from "@mui/icons-material/MonitorWeight";

export default function MedicalRecords({ user }) {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/medical/me");
        setRecord(res.data);
      } catch (err) {
        if (err.response?.status !== 404) {
          setError("Failed to load medical records. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <SideMenu user={user} />

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
          <Stack
            spacing={4}
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              mt: { xs: 8, md: 2 },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
                Medical Records
              </Typography>
            </Box>

            {!record && !error && (
               <Alert severity="info">No medical records found for this account.</Alert>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            {record && (
              <>
                {/* Vital Summary */}
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: alpha('#05339C', 0.02) }}>
                  <Grid container spacing={4} divider={<Divider orientation="vertical" flexItem />}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <BloodtypeIcon color="error" fontSize="large" />
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>BLOOD GROUP</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700 }}>{record.bloodGroup || "N/A"}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <HeightIcon color="primary" fontSize="large" />
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>HEIGHT</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700 }}>{record.height ? `${record.height} cm` : "N/A"}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ScaleIcon color="success" fontSize="large" />
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>WEIGHT</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700 }}>{record.weight ? `${record.weight} kg` : "N/A"}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Diagnoses */}
                <Box>
                   <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HealingIcon color="primary" /> Diagnoses & Conditions
                  </Typography>
                  <Grid container spacing={3}>
                    {record.diagnoses.map((diag, index) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <DetailedRecordCard
                          title={diag.description}
                          subtitle={diag.hospital}
                          status={diag.status}
                          date={diag.diagnosedAt}
                          icon={<MedicalServicesIcon />}
                          color="primary"
                          details={[
                            { label: "Doctor", value: diag.doctorName || "Unknown" },
                            { label: "ICD Code", value: diag.icdCode || "N/A" }
                          ]}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Vaccinations */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VaccinationIcon color="secondary" /> Vaccinations
                  </Typography>
                  <Grid container spacing={3}>
                    {record.vaccinations.map((vac, index) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <DetailedRecordCard
                          title={vac.vaccineName}
                          subtitle={vac.hospital}
                          date={vac.dateAdministered}
                          icon={<VaccinationIcon />}
                          color="secondary"
                          details={[
                            { label: "Dose Number", value: vac.doseNumber },
                            { label: "Next Due", value: vac.nextDueDate ? new Date(vac.nextDueDate).toLocaleDateString() : "None" }
                          ]}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Allergies */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HealingIcon color="error" /> Allergies
                  </Typography>
                  <Grid container spacing={3}>
                    {record.allergies.map((all, index) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <DetailedRecordCard
                          title={all.substance}
                          status={all.severity}
                          icon={<HealingIcon />}
                          color="error"
                          details={[
                            { label: "Reaction", value: all.reaction }
                          ]}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
