import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const MedicinskiPage = () => {
  const [studentsData, setStudentsData] = useState([]); // Studenti i njihova prisutnost
  const [user, setUser] = useState(null); // Trenutni korisnik
  const [loading, setLoading] = useState(true); // Dodano za praćenje statusa učitavanja

  // Provjera trenutnog korisnika prilikom učitavanja komponente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Učitavanje studenata i prisutnosti za predmet "Medicinski uređaji"
  useEffect(() => {
    if (user && user.email === 'prof5@fesb.com') {
      const fetchStudents = async () => {
        try {
          // Učitavanje studenata
          const studentsCollection = collection(db, 'student');
          const studentSnapshot = await getDocs(studentsCollection);
          const studentsList = studentSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            surname: doc.data().surname,
          }));

          console.log("Students List: ", studentsList); // Provjera učitanih studenata

          // Učitavanje prisutnosti za predmet "Medicinski uređaji"
          const attendanceCollection = collection(db, 'class/Medicinski uređaji/students');
          const attendanceSnapshot = await getDocs(attendanceCollection);
          const attendanceSurnames = attendanceSnapshot.docs.map(doc => doc.id);

          console.log("Attendance Surnames: ", attendanceSurnames); // Provjera učitane prisutnosti

          // Ažuriranje studenata s prisutnošću
          const updatedStudents = studentsList.map(student => ({
            ...student,
            present: attendanceSurnames.includes(student.surname),
          }));

          console.log("Updated Students: ", updatedStudents); // Provjera ažuriranih studenata
          setStudentsData(updatedStudents);
        } catch (error) {
          console.error('Error fetching students data:', error);
        } finally {
          setLoading(false); // Zatvaranje indikatora učitavanja kad su podaci učitani
        }
      };

      fetchStudents();
    }
  }, [user]);

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
      <h2 style={{ fontSize: '30px', color: '#0f1c30', fontFamily: 'Poppins, sans-serif' }}>
        Izvještaj o prisutnosti
      </h2>

      {loading ? (
        <div>Učitavanje podataka...</div> // Prikazuje tekst dok se podaci učitavaju
      ) : studentsData.length > 0 ? (
        <table style={{
          width: '80%',
          marginTop: '20px',
          borderCollapse: 'collapse',
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#668dc0', color: '#fff' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ime i prezime</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Prisutan</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => (
              <tr key={student.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {student.name} {student.surname}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {student.present ? (
                    <span style={{ color: '#0f1c30', fontWeight: '600' }}>Da</span>
                  ) : (
                    <span style={{ color: '#777' }}>Ne</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nema podataka za prikazivanje.</p>
      )}
    </div>
  );
};

export default MedicinskiPage;
