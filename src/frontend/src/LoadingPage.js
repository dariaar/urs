import React from 'react';

const LoadingPage = () => {
  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  };

  const circleStyle = {
    width: '40px',
    height: '40px',
    border: '5px solid #668dc0',
    borderTop: '5px solid #0f1c30',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={spinnerStyle}>
      <style>{keyframesStyle}</style>
      <div style={circleStyle}></div>
    </div>
  );
};

export default LoadingPage;
