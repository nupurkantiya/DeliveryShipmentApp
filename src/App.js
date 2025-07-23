import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/authcontext";
import Navbar from "./components/navbar";
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import CreateShipment from './pages/createshipment';
import TrackShipment from './pages/trackshipment';

function App() {
  return (
    <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-shipment" element={<CreateShipment />} />
          <Route path="/track-shipment" element={<TrackShipment />} />
        </Routes>
    </AuthProvider>
  );
}


export default App;
