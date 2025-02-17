import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import LoadingPage from "./LoadingPage";
import LandingPage from "./LandingPage";
import LoginForm from "./LoginForm";
import LoginProf from "./LoginProf";
import Dashboard from "./Dashboard";
import BusinessInfoSystems from "./subjects/BusinessInfoSystems/BusinessInfoSystems";
import Grid from "./subjects/Grid/Grid";
import Urs from "./subjects/Urs/Urs";
import Multimedija from "./subjects/Multimedija/Multimedija";
import Medicinski from "./subjects/Medicinski/Medicinski";
import Paralelno from "./subjects/Paralelno/Paralelno";
import Analitika from "./analitika";
import AttendanceReport from "./AttendanceReport";
import GridPage from "./GridPage";  // Importiraj GridAttendanceReport

// Firebase konfiguracija
const authInstance = getAuth();
setPersistence(authInstance, browserLocalPersistence);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Dodano stanje za praćenje učitavanja
  const [loggedInProfessor, setLoggedInProfessor] = useState(null); // Stanje za pohranu prijavljenog profesora

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Uklanjanje učitavanja nakon što je stanje korisnika postavljeno
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  // Provjera koji predmet treba biti preusmjeren za profesora
  const emailToRoute = {
    "prof1@fesb.com": "/grid",
    "prof2@fesb.com": "/multimedija",
    "prof3@fesb.com": "/poslovni",
    "prof4@fesb.com": "/ugradbeni",
    "prof5@fesb.com": "/medicinski",
    "prof6@fesb.com": "/paralelno",
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/login-professor"
          element={<LoginProf setLoggedInProfessor={setLoggedInProfessor} />}
        />
        <Route
          path="/report"
          element={
            loggedInProfessor ? (
              <AttendanceReport loggedInProfessor={loggedInProfessor} />
            ) : (
              <Navigate to="/login-professor" />
            )
          }
        />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/business-info-systems" element={user ? <BusinessInfoSystems /> : <Navigate to="/login" />} />
        <Route path="/grid-computer-systems" element={user ? <Grid /> : <Navigate to="/login" />} />
        <Route path="/urs" element={user ? <Urs /> : <Navigate to="/login" />} />
        <Route path="/multimedija" element={user ? <Multimedija /> : <Navigate to="/login" />} />
        <Route path="/medicinski" element={user ? <Medicinski /> : <Navigate to="/login" />} />
        <Route path="/paralelno" element={user ? <Paralelno /> : <Navigate to="/login" />} />
        <Route path="/analitika" element={user ? <Analitika /> : <Navigate to="/analitika" />} />
        
        {/* Nova ruta za Grid izvještaj o prisutnosti */}
        <Route path="/grid" element={user ? <GridPage /> : <Navigate to="/login" />} />
        
        {/* Ako je profesor prijavljen, preusmjeri ga na odgovarajući predmet */}
        {user && emailToRoute[user.email] && (
          <Route path="*" element={<Navigate to={emailToRoute[user.email]} />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;