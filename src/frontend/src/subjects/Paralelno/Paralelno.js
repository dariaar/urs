import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../../firebase-config'; // Uvjerite se da je putanja ispravna

const Paralelno = () => {
  const [studentInfo, setStudentInfo] = useState(null); // Početno stanje je null
  const [isLoading, setIsLoading] = useState(true); // Praćenje statusa učitavanja

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const user = auth.currentUser; // Dohvat trenutnog korisnika
        if (user) {
          const db = getFirestore();
          const studentsCollection = collection(db, 'student');
          const q = query(studentsCollection, where('email', '==', user.email)); // Pretraživanje po emailu
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Dohvaćanje podataka prvog dokumenta koji odgovara upitu
            const studentData = querySnapshot.docs[0].data();
            setStudentInfo({
              name: studentData.name || 'Nepoznato ime',
              surname: studentData.surname || 'Nepoznato prezime',
              timestamp: new Date().toLocaleString('hr-HR', { timeZone: 'Europe/Zagreb' }),
            });
          } else {
            console.error('Nema podataka za dani email.');
          }
        } else {
          console.error('Nema prijavljenog korisnika.');
        }
      } catch (error) {
        console.error('Greška pri dohvaćanju podataka:', error);
      } finally {
        setIsLoading(false); // Učitavanje završeno
      }
    };

    fetchStudentInfo();
  }, []);

  if (isLoading) {
    return <p>Učitavanje podataka...</p>; // Prikaz tijekom učitavanja
  }

  if (!studentInfo) {
    return <p>Podaci nisu dostupni.</p>; // Prikaz ako nema podataka
  }

  const qrContent = `Name: ${studentInfo.name}, Prezime: ${studentInfo.surname}, Timestamp: ${studentInfo.timestamp}`;

  return (
    <div
      style={{
        backgroundColor: '#F0F8FF', // Pozadina stranice usklađena s Dashboardom
        WebkitBackgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <h2 style={{ fontFamily: 'sans-serif', color: '#0f1c30', WebkitTextFillColor:'#0f1c30' }}>Paralelno Programiranje</h2>
      <div
        style={{
          backgroundColor: '#FFFFFF', // Bijela pozadina za QR kod
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <QRCodeCanvas value={qrContent} size={256} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold',  WebkitTextFillColor:'#0f1c30' }}>Ime: <span style={{ fontWeight: 'normal', WebkitTextFillColor:'#1a2a40' }}>{studentInfo.name}</span></p>
        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold',  WebkitTextFillColor:'#0f1c30' }}>Prezime: <span style={{ fontWeight: 'normal', WebkitTextFillColor:'#1a2a40' }}>{studentInfo.surname}</span></p>
        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold',  WebkitTextFillColor:'#0f1c30' }}>Vrijeme: <span style={{ fontWeight: 'normal', WebkitTextFillColor:'#1a2a40' }}>{studentInfo.timestamp}</span></p>
      </div>
    </div>
  );
};

export default Paralelno;
