import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Html5QrcodePlugin from "./scanner/Html5QrcodePlugin"; // Importiranje Html5QrcodePlugin

import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import BusinessInfoSystems from "./subjects/BusinessInfoSystems/BusinessInfoSystems";
import Grid from "./subjects/Grid/Grid";
import Urs from "./subjects/Urs/Urs";
import Multimedija from "./subjects/Multimedija/Multimedija";
import Medicinski from "./subjects/Medicinski/Medicinski";
import Paralelno from "./subjects/Paralelno/Paralelno";
import LandingPage from "./LandingPage";

// QR kod skener komponenta
const QRCodeScanner = ({ onNewScanResult, scanData }) => {
  useEffect(() => {
    // Cleanup funkcija za zaustavljanje kamere pri demontiranju
    return () => {
      console.log("QR Scanner component unmounted");
    };
  }, []);

  return (
    <div>
      <h1>QR Scanner</h1>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult} // Callback za uspješan rezultat
        qrCodeErrorCallback={(error) => console.error("QR Error: ", error)} // Callback za greške
      />
      <div>
        <h3>Pročitani podaci:</h3>
        <p>{scanData ? scanData : "Nema podataka"}</p>
      </div>
    </div>
  );
};

// App komponenta
const App = () => {
  // Stanje za pohranu skeniranih podataka
  const [scanData, setScanData] = useState("");

  // Callback funkcija koja obrađuje rezultate skeniranja
  const onNewScanResult = (decodedText, decodedResult) => {
    setScanData(decodedText); // Postavlja pročitane podatke u stanje
    console.log("Decoded text: ", decodedText); // Ispisuje podatke iz QR koda
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/business-info-systems"
          element={<BusinessInfoSystems />}
        />
        <Route path="/grid-computer-systems" element={<Grid />} />
        <Route path="/urs" element={<Urs />} />
        <Route path="/multimedija" element={<Multimedija />} />
        <Route path="/medicinski" element={<Medicinski />} />
        <Route path="/paralelno" element={<Paralelno />} />

        {/* Glavna ruta sa QR skenerom */}
        <Route
          path="/scanner"
          element={
            <QRCodeScanner
              onNewScanResult={onNewScanResult}
              scanData={scanData}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
