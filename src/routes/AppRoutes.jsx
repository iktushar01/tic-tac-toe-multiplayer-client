import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home/Home';
import MultiplayerGameRoom from '../pages/GameRoom/MultiplayerGameRoom';
import ComputerGameRoom from '../pages/GameRoom/ComputerGameRoom';
import RoomSelector from '../pages/GameRoom/RoomSelector';
import RoomGameRoom from '../pages/GameRoom/RoomGameRoom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game/multiplayer/:gameId"
        element={
          <ProtectedRoute>
            <MultiplayerGameRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game/computer/:gameId"
        element={
          <ProtectedRoute>
            <ComputerGameRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game/room-selector"
        element={
          <ProtectedRoute>
            <RoomSelector />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game/room/:gameId"
        element={
          <ProtectedRoute>
            <RoomGameRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;


