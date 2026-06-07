import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portal from './pages/Portal';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/portal" replace />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/portal" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
