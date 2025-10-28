import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import GameRoom from '../pages/GameRoom';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:gameId" element={<GameRoom />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

