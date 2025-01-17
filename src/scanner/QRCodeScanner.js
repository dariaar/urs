import React, { useState } from "react";
import QRScanner from "react-qr-scanner";

const QRCodeScanner = () => {
  const [data, setData] = useState("");

  // Funkcija koja se poziva kad se QR kod uspješno skenira
  const handleScan = (scanData) => {
    if (scanData) {
      setData(scanData.text); // Spremi pročitane podatke u state
    }
  };

  // Funkcija koja se poziva u slučaju pogreške pri skeniranju
  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <h1>QR Scanner</h1>
      <QRScanner
        delay={300} // Kašnjenje između snimanja okvira (u milisekundama)
        onScan={handleScan} // Poziva se kad QR kod bude skeniran
        onError={handleError} // Poziva se ako dođe do pogreške pri skeniranju
        style={{ width: "100%" }} // Stiliziraj skener
      />
      <div>
        <h3>Pročitani podaci:</h3>
        <p>{data ? data : "Nema podataka"}</p>{" "}
        {/* Prikazuje pročitane podatke */}
      </div>
    </div>
  );
};

export default QRCodeScanner;
