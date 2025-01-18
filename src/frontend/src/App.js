import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth"; // Firebase import

import LandingPage from "./LandingPage";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import BusinessInfoSystems from "./subjects/BusinessInfoSystems/BusinessInfoSystems";
import Grid from "./subjects/Grid/Grid";
import Urs from "./subjects/Urs/Urs";
import Multimedija from "./subjects/Multimedija/Multimedija";
import Medicinski from "./subjects/Medicinski/Medicinski";
import Paralelno from "./subjects/Paralelno/Paralelno";
import QRCodeScanner from "./scanner/QRCodeScanner";

const authInstance = getAuth();
setPersistence(authInstance, browserLocalPersistence);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Dohvaćeni korisnik iz localStorage:', storedUser);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      console.log('Trenutni korisnik:', currentUser); // Provjeri što Firebase vraća

      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
}, []);


  

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
        <Route path="/scanner" element={user ? <QRCodeScanner /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
