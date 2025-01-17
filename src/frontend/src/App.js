import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from './firebase-config';
 // Uvoz konfiguracije Firebase-a
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import BusinessInfoSystems from "./subjects/BusinessInfoSystems/BusinessInfoSystems";
import Grid from "./subjects/Grid/Grid";
import Urs from "./subjects/Urs/Urs";
import Multimedija from "./subjects/Multimedija/Multimedija";
import Medicinski from "./subjects/Medicinski/Medicinski";
import Paralelno from "./subjects/Paralelno/Paralelno";
import LandingPage from "./LandingPage";
import QRCodeScanner from "./scanner/QRCodeScanner";

const App = () => {
  const [user, setUser] = useState(null);

  // Praćenje promjena u stanju prijavljenog korisnika
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Čišćenje pretplate
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route
          path="/business-info-systems"
          element={user ? <BusinessInfoSystems /> : <Navigate to="/login" />}
        />
        <Route
          path="/grid-computer-systems"
          element={user ? <Grid /> : <Navigate to="/login" />}
        />
        <Route path="/urs" element={user ? <Urs /> : <Navigate to="/login" />} />
        <Route
          path="/multimedija"
          element={user ? <Multimedija /> : <Navigate to="/login" />}
        />
        <Route
          path="/medicinski"
          element={user ? <Medicinski /> : <Navigate to="/login" />}
        />
        <Route
          path="/paralelno"
          element={user ? <Paralelno /> : <Navigate to="/login" />}
        />
        <Route
          path="/scanner"
          element={user ? <QRCodeScanner /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;



/*
// src/App.jsx
import React from "react";
import Html5QrcodePlugin from "./scanner/Html5QrcodePlugin";

const App = () => {
  // Callback funkcija koja obrađuje rezultate skeniranja
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("Decoded text: ", decodedText); // Ispisuje podatke iz QR koda
  };

  return (
    <div className="App">
      <h1>QR Scanner</h1>
      <Html5QrcodePlugin
        fps={10} // Frames per second
        qrbox={250} // Veličina okvira za skeniranje
        disableFlip={false} // Omogućava ili onemogućava flip kamere
        qrCodeSuccessCallback={onNewScanResult} // Callback za uspješan rezultat
        qrCodeErrorCallback={(error) => console.error("QR Error: ", error)} // Callback za greške
      />
    </div>
  );
};

export default App;
*/