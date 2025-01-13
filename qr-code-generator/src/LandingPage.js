import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ispravan import za navigaciju

const LandingPage = () => {
  const navigate = useNavigate();  // Korištenje useNavigate za navigaciju

  const handleLoginClick = () => {
    navigate('/login');  // Navigacija na stranicu za prijavu
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <h1>Dobrodošli na naš sustav</h1>
      <p>Molimo prijavite se kako biste nastavili.</p>
      <button
        onClick={handleLoginClick}
        style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '5px', backgroundColor: '#0f1c30', color: '#c2c6ce', border: 'none', cursor: 'pointer' }}
      >
        Prijava u sustav
      </button>
    </div>
  );
};

export default LandingPage;
