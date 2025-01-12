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
          Gridski Računalni Sustavi
        </Link>

        <Link to="/machine-learning" style={buttonStyle}>
          Strojno Učenje
        </Link>

        <Link to="/data-science" style={buttonStyle}>
          Znanost o Podacima
        </Link>

        <Link to="/network-security" style={buttonStyle}>
          Sigurnost Mreže
        </Link>

        <Link to="/cloud-computing" style={buttonStyle}>
          Računarstvo u Oblaku
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