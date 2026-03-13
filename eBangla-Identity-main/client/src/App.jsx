import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";

// Components
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MedicalRecords from "./pages/MedicalRecords";
import PoliceRecords from "./pages/PoliceRecords";
import TaxRecords from "./pages/TaxRecords"; // <--- Added this import

// Configure axios defaults
axios.defaults.withCredentials = true;

const ProtectedRoute = ({
  children,
  user,
  loading,
  requireCompleteProfile = true,
}) => {
  if (loading) return null; 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireCompleteProfile && !user.isProfileComplete) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#05339C",
      light: "#3a5fc4",
      dark: "#02206a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f8ff",
    },
    text: {
      primary: "#0d1b3e",
      secondary: "#4a5a80",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                user={user}
                loading={loading}
                requireCompleteProfile={false}
              >
                <Profile user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/medical"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <MedicalRecords user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/police"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <PoliceRecords user={user} />
              </ProtectedRoute>
            }
          />

          {/* Tax route added here */}
          <Route
            path="/tax"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <TaxRecords user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Navigate to="/profile" replace />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;