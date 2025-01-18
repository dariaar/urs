import { Link, useNavigate } from 'react-router-dom'; // Dodan useNavigate za navigaciju
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const Dashboard = () => {
  const [hoveredLink, setHoveredLink] = useState(null); // Praćenje hover stanja za svaki link
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)  // Firebase logout
      .then(() => {
        console.log('Odjava uspješna!');
        localStorage.removeItem('user');  // Uklanjanje podataka iz localStorage
        navigate('/login');  // Preusmjeravanje na login stranicu
      })
      .catch((error) => {
        console.error('Greška prilikom odjave:', error);  // Obrađivanje greške
      });
  };

  const getButtonStyle = (link) => ({
    padding: '10px 20px',
    backgroundColor: hoveredLink === link ? '#668dc0' : '#304a6e', // Promjena boje pri hoveru
    color: hoveredLink === link ? '#f0f8ff' : '#c2c6ce', // Promjena boje teksta
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    textAlign: 'center',
    width: '250px',
    marginTop: '20px',
    transition: 'background-color 0.5s, color 0.5s', // Glatka tranzicija
    border: hoveredLink === link ? '2px solid #f0f8ff' : '2px solid transparent'
  });

  return (
    <div
      style={{
        backgroundColor: '#F0F8FF',
        WebkitBackgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center', WebkitTextFillColor: '#0f1c30' }}>
          <h1>Sustav evidencije prisutnosti na nastavi</h1>
          <h2>Odaberi predmet!</h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginTop: '20px',
            alignItems: 'center',
          }}
        >
          {[
            { to: '/business-info-systems', label: 'Poslovni informacijski sustavi' },
            { to: '/grid-computer-systems', label: 'Grid računalni sustavi' },
            { to: '/urs', label: 'Ugradbeni računalni sustavi' },
            { to: '/multimedija', label: 'Multimedijski sustavi' },
            { to: '/medicinski', label: 'Medicinski uređaji' },
            { to: '/paralelno', label: 'Paralelno programiranje' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={getButtonStyle(link.to)}
              onMouseEnter={() => setHoveredLink(link.to)} // Postavlja hovered link
              onMouseLeave={() => setHoveredLink(null)} // Resetira hovered link
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0f1c30',
              color: '#668dc0',
              borderRadius: '5px',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#668dc0'; // Pozadina mijenja boju
              e.target.style.color = '#0f1c30'; // Tekst mijenja boju na hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#0f1c30'; // Bijela pozadina
              e.target.style.color = '#668dc0'; // Povratak na početnu boju teksta
            }}
          >
            Odjava
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
