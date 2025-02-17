import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginProf = ({ setLoggedInProfessor }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Funkcija za navigaciju na predmetnu stranicu ovisno o emailu profesora
  const navigateToSubject = (email) => {
    switch (email) {
      case "prof1@fesb.com":
        navigate("/gridreport");
        break;
      case "prof2@fesb.com":
        navigate("/multimedijareport");
        break;
      case "prof3@fesb.com":
        navigate("/poslovnireport");
        break;
      case "prof4@fesb.com":
        navigate("/ugradbenireport");
        break;
      case "prof5@fesb.com":
        navigate("/medicinskireport");
        break;
      case "prof6@fesb.com":
        navigate("/paralelnoreport");
        break;
      default:
        navigate("/report"); // Ako email nije prepoznat, odvede ga na generički izvještaj
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Provjera prijave sa Firebaseom
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedInProfessor(email); // Spremanje prijavljenog profesora u roditeljsku komponentu
      navigateToSubject(email); // Navigacija na odgovarajući predmet prema emailu
    } catch (error) {
      setError("Neispravan email ili lozinka");
      console.error(error.message);
    }
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: 5,
    backgroundColor: isHovered ? "#668dc0" : "#0f1c30",
    color: isHovered ? "#0f1c30" : "#668dc0",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.5s, color 0.5s",
    fontFamily: "Poppins, sans-serif",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#668DC0",
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#f0f8ff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "#0f1c30",
            marginBottom: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Professor Login
        </h1>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "10px 0" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#333",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "75%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: 5,
                border: "1px solid #ccc",
                backgroundColor: "#fff",
              }}
            />
          </div>
          <div style={{ margin: "10px 0" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#333",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "75%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: 5,
                border: "1px solid #ccc",
                backgroundColor: "#fff",
              }}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Prijava
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginProf;
