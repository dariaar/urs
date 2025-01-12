import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Koristimo QRCodeCanvas umjesto default importa

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    professorId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateTimestamp = () => {
    return new Date().toISOString();
  };

  const qrCodeData = {
    ...formData,
    timestamp: generateTimestamp(),
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>QR Code Generator for Attendance</h1>
      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          name="professorId"
          placeholder="Professor ID"
          value={formData.professorId}
          onChange={handleChange}
          style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <QRCodeCanvas value={JSON.stringify(qrCodeData)} size={256} />
      </div>
      <p style={{ marginTop: '20px' }}>
        <strong>QR Code Data:</strong> {JSON.stringify(qrCodeData)}
      </p>
    </div>
  );
};

export default App;