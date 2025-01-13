import React from 'react';
import { Link } from 'react-router-dom';  // Ispravan import za navigaciju

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dobrodošli na Dashboard</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginTop: '20px',alignItems:'center' }}>
        <Link to="/business-info-systems" style={buttonStyle}>
          Poslovni Informacijski Sustavi
        </Link>
        
        <Link to="/grid-computer-systems" style={buttonStyle}>
          Grid Računalni Sustavi
        </Link>

        <Link to="/urs" style={buttonStyle}>
          Ugradbeni Računalni sustavi
        </Link>

        <Link to="/multimedija" style={buttonStyle}>
          Multimedijski sustavi
        </Link>

        <Link to="/medicinski" style={buttonStyle}>
          Medicinski udeđaji
        </Link>

        <Link to="/paralelno" style={buttonStyle}>
          Paralelno programiranje
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  textAlign: 'center',
  width: '150px',
};

export default Dashboard;