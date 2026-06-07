import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portal from './pages/Portal';
import Admin from './pages/Admin';
import { initialShipments } from './data/sharedData';

function App() {
  const [shipments, setShipments] = useState(initialShipments);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/portal" replace />} />
        
        <Route 
          path="/portal" 
          element={<Portal shipments={shipments} />} 
        />
        
        <Route 
          path="/admin" 
          element={<Admin shipments={shipments} setShipments={setShipments} />} 
        />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/portal" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
