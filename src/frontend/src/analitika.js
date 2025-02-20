import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Analitika = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("✅ Prijavljen korisnik:", currentUser.email);
        setUser(currentUser);
      } else {
        console.log("⚠️ Nema prijavljenog korisnika.");
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          // 🔹 Prvo dohvaćamo studenta iz kolekcije "student" pomoću emaila
          const studentsRef = collection(db, "student");
          const q = query(studentsRef, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.warn("❌ Student nije pronađen u bazi!");
            setLoading(false);
            return;
          }

          const studentData = querySnapshot.docs[0].data();
          const studentSurname = studentData.surname;
          console.log("🆔 Pronađen student:", studentData);

          await fetchAttendance(studentSurname);
        } catch (error) {
          console.error("❌ Greška kod dohvaćanja podataka:", error);
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const fetchAttendance = async (studentSurname) => {
    try {
      const subjects = [
        'Grid računalni sustavi',
        'Medicinski uređaji',
        'Multimedijski sustavi',
        'Paralelno programiranje',
        'Poslovni informacijski sustavi',
        'Ugradbeni računalni sustavi'
      ];

      const attendancePromises = subjects.map(async (subject) => {
        // 📌 Dohvaćamo podatke iz kolekcije "class/{subject}/students/{studentSurname}"
        const studentDocRef = doc(db, `class/${subject}/students/${studentSurname}`);
        const studentDoc = await getDoc(studentDocRef);

        if (!studentDoc.exists()) {
          console.warn(`❌ Student ${studentSurname} nema podatke za predmet ${subject}`);
          return { subject, attended: 0, total: 13, percentage: '0.00' };
        }

        const studentData = studentDoc.data();
        const timestamps = studentData.timestamps || [];
        console.log(`📅 Pronađeni dolasci za ${subject}:`, timestamps);

        const attended = timestamps.length;
        const total = 13; // Možeš prilagoditi broj predavanja
        const percentage = ((attended / total) * 100).toFixed(2);

        return { subject, attended, total, percentage };
      });

      const fetchedData = await Promise.all(attendancePromises);
      setAttendanceData(fetchedData);
    } catch (error) {
      console.error('❌ Greška kod dohvaćanja prisutnosti:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Učitavanje podataka...</div>;
  }

  return (
    <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0f1c30', marginBottom: '20px' }}>Moja Prisutnost</h1>
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
              <td style={{ padding: '15px', borderBottom: '1px solid #ddd', textAlign: 'left', color: item.attended < 9 ? '#d97979' : '#0f1c30', fontWeight: item.attended < 9 ? 'bold' : 'normal' }}>
                {item.subject}
              </td>
              <td style={{ padding: '15px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                {item.attended} / {item.total}
              </td>
              <td style={{ padding: '15px', borderBottom: '1px solid #ddd', textAlign: 'left', fontWeight: 'bold', color: parseFloat(item.percentage) < 50 ? '#d9534f' : '#0f1c30' }}>
                {item.percentage}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analitika;