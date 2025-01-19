import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = () => {
  const [data, setData] = useState("");
  const scannerRef = useRef(null); // Referenca za skener

  useEffect(() => {
    // Provjeravamo da se skener pokreće samo jednom
    if (scannerRef.current) return; // Ako skener već postoji, nemoj ga ponovno pokretati

    const qrCodeRegionId = "html5-qrcode-scanner";

    // Inicijalizacija skenera
    const scanner = new Html5QrcodeScanner(qrCodeRegionId, {
      fps: 10, // Frames per second
      qrbox: 250, // Velicina okvira za skeniranje
    });

    scanner.render(onScanSuccess, onScanError);
    scannerRef.current = scanner; // Spremanje instance skenera za daljnje upravljanje

    // Cleanup funkcija
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear(); // Očisti skener prilikom unmounta
        scannerRef.current = null; // Resetiranje reference
      }
    };
  }, []); // Prazni array znači da se useEffect poziva samo jednom

  // Funkcija za uspješno skeniranje
  const onScanSuccess = (decodedText, decodedResult) => {
    setData(decodedText); // Postavljanje pročitane vrijednosti
    console.log("Decoded text: ", decodedText);
  };

  // Funkcija za greške pri skeniranju
  const onScanError = (error) => {
    console.error("Error scanning QR code: ", error);
  };

  return (
    <div>
      <h1>QR Scanner</h1>
      <div id="html5-qrcode-scanner" style={{ width: "100%" }}></div>
      <div>
        <h3>Pročitani podaci:</h3>
        <p>{data || "Nema podataka"}</p>
      </div>
    </div>
  );
};

export default QRCodeScanner;
