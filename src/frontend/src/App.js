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
import Html5QrcodePlugin from "./scanner/Html5QrcodePlugin"; // Importiranje Html5QrcodePlugin
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

// Firebase konfiguracija
const authInstance = getAuth();
setPersistence(authInstance, browserLocalPersistence);

// QR kod skener komponenta
const QRCodeScanner = ({ onNewScanResult, scanData }) => {
  useEffect(() => {
    // Cleanup funkcija za zaustavljanje kamere pri demontiranju
    return () => {
      console.log("QR Scanner component unmounted");
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>QR Scanner</h1>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult} // Callback za uspješan rezultat
        qrCodeErrorCallback={(error) => console.error("QR Error: ", error)} // Callback za greške
      />
      <div style={{ marginTop: "20px" }}>
        <h3>Pročitani podaci:</h3>
        <p>{scanData ? scanData : "Nema podataka"}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Dodano stanje za praćenje učitavanja
  const [scanData, setScanData] = useState(""); // Dodano stanje za QR skener

  // Callback funkcija koja obrađuje rezultate skeniranja
  const onNewScanResult = (decodedText, decodedResult) => {
    setScanData(decodedText); // Postavlja pročitane podatke u stanje
    console.log("Decoded text: ", decodedText); // Ispisuje podatke iz QR koda
  };

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
        <Route
          path="/urs"
          element={user ? <Urs /> : <Navigate to="/login" />}
        />
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

        {/* QR skener ruta */}
        <Route
          path="/scanner"
          element={
            user ? (
              <QRCodeScanner
                onNewScanResult={onNewScanResult}
                scanData={scanData}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
