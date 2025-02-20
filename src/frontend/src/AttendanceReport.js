import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase-config'; // Ispravan put do Firebase konfiguracije
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const AttendanceReport = () => {
  const [studentsData, setStudentsData] = useState([]); // Studenti i njihova prisutnost
  const [user, setUser] = useState(null); // Trenutni korisnik
  const [subjectId, setSubjectId] = useState(''); // ID predmeta koji je povezan s profesorom

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

  // Odrediti predmet na temelju emaila profesora
  useEffect(() => {
    if (user) {
      const getSubjectByEmail = (email) => {
        switch (email) {
          case 'prof1@fesb.com':
            return 'grid'; // povezivanje s predmetom Grid
          case 'prof2@fesb.com':
            return 'multimedija'; // povezivanje s predmetom Multimedija
          case 'prof3@fesb.com':
            return 'poslovni'; // povezivanje s predmetom Business Info Systems
          case 'prof4@fesb.com':
            return 'ugradbeni'; // povezivanje s predmetom Urs
          case 'prof5@fesb.com':
            return 'medicinski'; // povezivanje s predmetom Medicinski
          case 'prof6@fesb.com':
            return 'paralelno'; // povezivanje s predmetom Paralelno
          default:
            return ''; // Ako nije prepoznat email, nemamo predmet
        }
      };

      const subject = getSubjectByEmail(user.email);
      setSubjectId(subject); // Postavljanje ID predmeta temeljenog na emailu
    }
  }, [user]);

  // Ako korisnik nije prepoznat (nema dopuštenje), prikazujemo poruku
  if (user && !subjectId) {
    return (
      <div style={{ 
        backgroundColor: '#f0f8ff', 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center' 
      }}>
        <h2 style={{ color: '#0f1c30', fontFamily: 'Poppins, sans-serif', fontSize: '24px' }}>
          Nemate pristup ovoj stranici.
        </h2>
      </div>
    );
  }

  // Učitavanje studenata iz kolekcije "student" i provjera prisutnosti za predmet
  useEffect(() => {
    if (subjectId) {
      const fetchStudents = async () => {
        try {
          // Dohvat studenata
          const studentsCollection = collection(db, 'student');
          const studentSnapshot = await getDocs(studentsCollection);
          const studentsList = studentSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            surname: doc.data().surname,
          }));

          // Dohvat prisutnosti studenata za odabrani predmet
          const attendanceCollection = collection(db, `class/${subjectId}/students`);
          const attendanceSnapshot = await getDocs(attendanceCollection);
          const attendanceSurnames = attendanceSnapshot.docs.map(doc => doc.id);

          // Ažuriranje podataka studenata s informacijom o prisutnosti
          const updatedStudents = studentsList.map(student => ({
            ...student,
            present: attendanceSurnames.includes(student.surname),
          }));

          setStudentsData(updatedStudents);
        } catch (error) {
          console.error('Error fetching students data:', error);
        }
      };

      fetchStudents();
    }
  }, [subjectId]);

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

      {subjectId && (
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
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
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
      )}
    </div>
  );
};

export default AttendanceReport;