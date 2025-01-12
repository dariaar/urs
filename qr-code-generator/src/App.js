import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import BusinessInfoSystems from './subjects/BusinessInfoSystems/BusinessInfoSystems';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business-info-systems" element={<BusinessInfoSystems />} />  {/* Dodano */}
      </Routes>
    </Router>
  );
};

export default App;