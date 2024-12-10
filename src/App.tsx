import { Routes, Route, Navigate } from 'react-router-dom';
import Offers from './pages/Offers';
import Admin from './pages/Admin';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import { Navbar } from './components/Navbar';
import { AuthGuard } from './components/AuthGuard';
import { useEffect } from "react";
import { generateToken, messaging } from './lib/firebase.ts';
import { onMessage } from "firebase/messaging";

export default function App() {
  useEffect(() => {
    generateToken();
    console.log('release 1.0.0');
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      if(payload.notification && payload.notification.title){
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.image,
        });
      }
    });
  }, []);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/offers" replace />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AuthGuard requireRole="hotel">
              <Admin />
            </AuthGuard>
          }
        />
        <Route
          path="/superadmin"
          element={
            <AuthGuard requireRole="superadmin">
              <SuperAdmin />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
}