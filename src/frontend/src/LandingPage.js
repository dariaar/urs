import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './slike/logo.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleProfessorLoginClick = () => {
    navigate('/login-professor');
  };

  return (
    <div style={{ 
      backgroundColor: '#f0f8ff', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center' 
    }}>
      <h2 style={{ fontSize: '30px', marginBottom: '20px', color: '#0f1c30', fontFamily: 'Poppins, sans-serif', animation: 'slideIn 1s ease-out' }}>EduScan</h2>
      <img 
        src={logo} 
        alt="EduScan Logo" 
        style={{ width: '20%', height: '20%', marginBottom: '20px', animation: 'slideIn 1s ease-out' }} 
      />
      <h1 style={{ fontSize: '25px', fontFamily: 'Poppins, sans-serif', marginBottom: '20px', color: '#668dc0', animation: 'slideIn 1s ease-out'}}>Dobrodošli na EduScan!</h1>
      <p style={{ marginBottom: '20px', fontFamily: 'Poppins, sans-serif', color: '#777', animation: 'slideIn 1s ease-out' }}>Molimo prijavite se u sustav kako biste nastavili.</p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={handleLoginClick}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600', 
            borderRadius: '5px',
            backgroundColor: '#0f1c30',
            color: '#668dc0',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            animation: 'slideIn 1s ease-out'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#668dc0';
            e.target.style.color = '#0f1c30';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#0f1c30';
            e.target.style.color = '#668dc0';
          }}
        >
          PRIJAVA STUDENT
        </button>
        <button
          onClick={handleProfessorLoginClick}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600', 
            borderRadius: '5px',
            backgroundColor: '#0f1c30',
            color: '#668dc0',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            animation: 'slideIn 1s ease-out'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#668dc0';
            e.target.style.color = '#0f1c30';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#0f1c30';
            e.target.style.color = '#668dc0';
          }}
        >
          PRIJAVA PROFESOR
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
