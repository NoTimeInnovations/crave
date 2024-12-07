import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { Navbar } from './components/Navbar';
import { AuthGuard } from './components/AuthGuard';

export default function App() {
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
            <AuthGuard>
              <Admin />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
}