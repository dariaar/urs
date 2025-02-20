import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Analitika = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchAttendance = async () => {
        try {
          const subjects = [
            'Poslovni informacijski sustavi',
            'Grid računalni sustavi',
            'Medicinski uređaji',
            'Multimedijski Sustavi',
            'Paralelno programiranje'
          ];

          const attendancePromises = subjects.map(async (subject) => {
            const subjectCollection = collection(db, 'class', subject, 'students');
            const q = query(subjectCollection, where('name', '==', user.displayName || user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const studentData = querySnapshot.docs[0].data();
              const timestamps = studentData.timestamps || [];
              const attended = timestamps.length; // Broj dolazaka
              const total = 13;
              const percentage = ((attended / total) * 100).toFixed(2);

              return { subject, attended, total, percentage };
            } else {
              return { subject, attended: 0, total: 13, percentage: '0.00' };
            }
          });

          const fetchedData = await Promise.all(attendancePromises);
          setAttendanceData(fetchedData);
        } catch (error) {
          console.error('Error fetching attendance data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAttendance();
    }
  }, [user]);

  if (loading) {
    return <div>Učitavanje podataka...</div>;
  }

  return (
    <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0f1c30', marginBottom: '20px' }}>Analitika Prisutnosti</h1>
      <table style={{ width: '70%', borderCollapse: 'collapse', backgroundColor: '#ffffff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#304a6e', color: '#f0f8ff', textAlign: 'left' }}>
            <th style={{ padding: '15px', borderBottom: '2px solid #c2c6ce', textAlign: 'left' }}>Predmet</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #c2c6ce', textAlign: 'left' }}>Prisutnost</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #c2c6ce', textAlign: 'left' }}>Postotak</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#dbe9ff' : '#ffffff' }}>
              <td style={{ padding: '15px', borderBottom: '1px solid #ddd', textAlign: 'left', color: item.attended < 9 ? '#d97979' : '#0f1c30', fontWeight: item.attended < 9 ? 'bold' : 'normal' }}>{item.subject}</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{item.attended} / {item.total}</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #ddd', textAlign: 'left', fontWeight: 'bold', color: parseFloat(item.percentage) < 50 ? '#d9534f' : '#0f1c30' }}>{item.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analitika;