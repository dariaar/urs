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
import Dashboard from "./Dashboard";
import BusinessInfoSystems from "./subjects/BusinessInfoSystems/BusinessInfoSystems";
import Grid from "./subjects/Grid/Grid";
import Urs from "./subjects/Urs/Urs";
import Multimedija from "./subjects/Multimedija/Multimedija";
import Medicinski from "./subjects/Medicinski/Medicinski";
import Paralelno from "./subjects/Paralelno/Paralelno";
import Analitika from "./analitika";


// Firebase konfiguracija
const authInstance = getAuth();
setPersistence(authInstance, browserLocalPersistence);


const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Dodano stanje za praćenje učitavanja
 

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/business-info-systems" element={user ? <BusinessInfoSystems /> : <Navigate to="/login" />} />
        <Route path="/grid-computer-systems" element={user ? <Grid /> : <Navigate to="/login" />} />
        <Route path="/urs" element={user ? <Urs /> : <Navigate to="/login" />} />
        <Route path="/multimedija" element={user ? <Multimedija /> : <Navigate to="/login" />} />
        <Route path="/medicinski" element={user ? <Medicinski /> : <Navigate to="/login" />} />
        <Route path="/paralelno" element={user ? <Paralelno /> : <Navigate to="/login" />} />
        <Route path="/analitika" element={user ? <Analitika /> : <Navigate to="/analitika" />} />
  
      </Routes>
    </Router>
  );
};

export default App;
