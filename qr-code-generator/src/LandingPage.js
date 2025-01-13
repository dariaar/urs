import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ispravan import za navigaciju
import image1 from './slike/image1.jpg'

const LandingPage = () => {
  const navigate = useNavigate();  // Korištenje useNavigate za navigaciju

  const handleLoginClick = () => {
    navigate('/login');  // Navigacija na stranicu za prijavu
  };

  return (
    <div style={{ backgroundColor: '#f0f8ff' }}>
      <div style={{ paddingLeft: '50px', backgroundColor: '#f0f8ff', paddingTop:'20px' }}>
        <h2>ime app</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '100vh', padding: '50px' }}>
        <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
          <h1>Dobrodošli na naš sustav</h1>
          <p>Molimo prijavite se kako biste nastavili.</p>
          <button
            onClick={handleLoginClick}
            style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '5px', backgroundColor: '#0f1c30', color: '#c2c6ce', border: 'none', cursor: 'pointer' }}
          >
            Prijava u sustav
          </button>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          <img 
            src={image1} 
            alt="Descriptive Alt Text" 
            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
