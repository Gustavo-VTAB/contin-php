import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login'
import Dashboard from '../pages/Dashboard';
import CardsPage from '../pages/Cards/CardsPage';
import PhonesPage from '../pages/Phones/PhonesPage';
import ProfilesPage from '../pages/Profiles/ProfilesPage';
import BMsPage from '../pages/BMs/BMsPage';
import PagesPage from '../pages/Pages/PagesPage';
import LogsPage from '../pages/Logs/LogsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/bms" element={<BMsPage />} />
        <Route path="/pages" element={<PagesPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
