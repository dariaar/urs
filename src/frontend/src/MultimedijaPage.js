import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const MultimedijaPage = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceByDate, setAttendanceByDate] = useState({});

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

  useEffect(() => {
    if (user && user.email === 'prof2@fesb.com') {
      const fetchStudents = async () => {
        try {
          const studentsCollection = collection(db, 'student');
          const studentSnapshot = await getDocs(studentsCollection);
          const studentsList = studentSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            surname: doc.data().surname,
          }));

          const attendanceCollection = collection(db, 'class/Multimedijski sustavi/students');
          const attendanceSnapshot = await getDocs(attendanceCollection);

          let attendanceData = {};

          const updatedStudents = await Promise.all(studentsList.map(async student => {
            const studentDoc = attendanceSnapshot.docs.find(doc => doc.id === student.surname);

            if (studentDoc && studentDoc.data().timestamps) {
              const timestamps = studentDoc.data().timestamps;
              const attendanceCount = timestamps.length;
              const percentage = ((attendanceCount / 13) * 100).toFixed(2);

              // Obrada timestampova
              timestamps.forEach(timestamp => {
                let dateObj;

                if (timestamp && typeof timestamp === 'object' && 'timestamp' in timestamp) {
                  // Ako je objekat sa 'timestamp' poljem
                  dateObj = new Date(timestamp.timestamp);
                } else if (typeof timestamp === 'string') {
                  // Ako je ISO string format
                  dateObj = new Date(timestamp);
                } else {
                  console.error("Invalid timestamp:", timestamp);
                  return; // Preskačemo nevalidne vrednosti
                }

                if (!isNaN(dateObj.getTime())) {
                  const date = dateObj.toLocaleDateString('hr-HR');
                  if (!attendanceData[date]) {
                    attendanceData[date] = [];
                  }
                  attendanceData[date].push(`${student.name} ${student.surname}`);
                } else {
                  console.error("Could not parse date:", timestamp);
                }
              });

              return {
                ...student,
                attendanceCount,
                percentage,
              };
            }

            return {
              ...student,
              attendanceCount: 0,
              percentage: '0.00',
            };
          }));

          setStudentsData(updatedStudents);
          setAttendanceByDate(attendanceData);
        } catch (error) {
          console.error('Error fetching students data:', error);
        } finally {
          setLoading(false);
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
      textAlign: 'center',
      padding: '20px',
    }}>
      <h2 style={{
        fontSize: '30px',
        color: '#0f1c30',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '20px',
      }}>
        Izvještaj o prisutnosti - Multimedijski sustavi
      </h2>

      {loading ? (
        <div style={{ fontSize: '20px', fontFamily: 'Poppins, sans-serif', color: '#0f1c30' }}>
          Učitavanje podataka...
        </div>
      ) : studentsData.length > 0 ? (
        <>
          <table style={{
            width: '90%',
            marginTop: '20px',
            borderCollapse: 'collapse',
            fontFamily: 'Poppins, sans-serif',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#4f75a1',
                color: '#fff',
                textAlign: 'left',
                fontSize: '16px',
                borderRadius: '12px',
              }}>
                <th style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderTopLeftRadius: '12px',
                  textAlign: 'center',
                }}>Ime i prezime</th>
                <th style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  textAlign: 'center',
                }}>Dolasci</th>
                <th style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  textAlign: 'center',
                  borderTopRightRadius: '12px',
                }}>Postotak</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student, index) => (
                <tr key={student.id} style={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                  transition: 'background-color 0.3s',
                }}>
                  <td style={{
                    padding: '15px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    color: '#333',
                  }}>
                    {student.name} {student.surname}
                  </td>
                  <td style={{
                    padding: '15px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                    fontSize: '16px',
                    color: '#333',
                  }}>
                    {student.attendanceCount} / 13
                  </td>
                  <td style={{
                    padding: '15px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                    fontSize: '16px',
                    color: '#333',
                  }}>
                    {student.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{
            fontSize: '24px',
            color: '#0f1c30',
            fontFamily: 'Poppins, sans-serif',
            marginTop: '40px',
          }}>
            Prisutnost po datumima
          </h3>
          <ul style={{
            listStyleType: 'none',
            paddingLeft: '0',
            fontFamily: 'Poppins, sans-serif',
          }}>
            {Object.keys(attendanceByDate).length > 0 ? (
              Object.keys(attendanceByDate).map(date => (
                <li key={date} style={{
                  backgroundColor: '#e6f4ff',
                  padding: '10px',
                  margin: '5px 0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: '#333',
                }}>
                  <strong>{date}:</strong> {attendanceByDate[date].join(', ')}
                </li>
              ))
            ) : (
              <p>Nema podataka o prisutnosti po datumima.</p>
            )}
          </ul>
        </>
      ) : (
        <p>Nema podataka za prikazivanje.</p>
      )}
    </div>
  );
};

export default MultimedijaPage;
