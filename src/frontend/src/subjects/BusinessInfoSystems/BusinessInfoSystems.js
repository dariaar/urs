import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../../firebase-config'; // Uvjerite se da je putanja ispravna

const BusinessInfoSystems = () => {
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
              timestamp: new Date().toISOString(),
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
    <div>
      <h2>Poslovni Informacijski Sustavi</h2>
      <QRCodeCanvas value={qrContent} size={256} />
      <p>Ime: {studentInfo.name}</p>
      <p>Prezime: {studentInfo.surname}</p>
      <p>Vrijeme: {studentInfo.timestamp}</p>
    </div>
  );
};

export default BusinessInfoSystems;
