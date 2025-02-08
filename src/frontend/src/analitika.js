import React from 'react';

const Analitika = () => {
  // Hardkodirani podaci o prisutnosti studenta na predmetima
  const attendanceData = [
    { subject: 'Poslovni informacijski sustavi', attended: 10, total: 13 },
    { subject: 'Grid računalni sustavi', attended: 12, total: 13 },
    { subject: 'Medicinski uređaji', attended: 7, total: 13 },
    { subject: 'Multimedijski Sustavi', attended: 11, total: 13 },
    { subject: 'Paralelno programiranje', attended: 8, total: 13 },
  ];

  return (
    <div
      style={{
        backgroundColor: '#f0f8ff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#0f1c30', marginBottom: '20px' }}>Analitika Prisutnosti</h1>
      
      <table
        style={{
          width: '70%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#304a6e', color: '#f0f8ff', textAlign: 'left' }}>
            <th style={{ padding: '15px', borderBottom: '2px solid #c2c6ce', textAlign: 'left' }}>Predmet</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #c2c6ce', textAlign: 'left' }}>Prisutnost</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #c2c6ce', textAlign: 'left' }}>Postotak</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => {
            const attendancePercentage = (item.attended / item.total) * 100;
            const isLowAttendance = attendancePercentage < 70;

            return (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#dbe9ff' : '#ffffff' }}>
                <td
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #ddd',
                    textAlign: 'left',
                    color: isLowAttendance ? '#d97979' : '#0f1c30', // Pastelna crvena ako je prisutnost manja od 70%
                    fontWeight: isLowAttendance ? 'bold' : 'normal',
                  }}
                >
                  {item.subject}
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                  {item.attended} / {item.total}
                </td>
                <td
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #ddd',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    color: attendancePercentage < 50 ? '#d9534f' : '#0f1c30', // Jako crveno ako je ispod 50%
                  }}
                >
                  {attendancePercentage.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Analitika;
