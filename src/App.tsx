import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { Navbar } from './components/Navbar';
import { AuthGuard } from './components/AuthGuard';
import {useEffect} from "react";
import { generateToken, messaging } from './lib/firebase.ts';
import { onMessage } from "firebase/messaging";

export default function App() {
  
  useEffect(()=>{
    generateToken();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  },[])
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/offers"
          element={
            <AuthGuard>
              <Offers />
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard requireRole="hotel">
              <Admin />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
}