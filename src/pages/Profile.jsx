import { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    avatar: null,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.displayName || 'Player',
        email: user.email || '',
        avatar: user.photoURL || null,
      });
      apiService.getUserStats(user.uid).then(setStats);
    }
  }, [user]);

  const handleSave = () => {
    // In a real app, this would update the backend
    alert('Profile updated! (This is a demo)');
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-lg text-gray-400">
            Manage your account and view your statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  <div className="flex gap-2">
                    {!editMode ? (
                      <button
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                        onClick={() => setEditMode(true)}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                          <button
                          className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all border border-gray-600"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all" onClick={handleSave}>
                          Save
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                    <div className="avatar placeholder">
                    <div className="w-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-4xl">
                      <span>{profileData.username.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{profileData.username}</p>
                    <p className="text-sm text-gray-400">{profileData.email}</p>
                    <p className="text-sm text-gray-500">
                      Member since {new Date().getFullYear()}
                    </p>
                  </div>
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all"
                        value={profileData.username}
                        onChange={(e) =>
                          setProfileData({ ...profileData, username: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="font-semibold">Username</span>
                      <span>{profileData.username}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="font-semibold">Email</span>
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="font-semibold">Status</span>
                      <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">Active</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats & Settings */}
          <div className="space-y-6">
            {/* Quick Stats */}
            {stats && (
              <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white">Rank</span>
                      <span className="text-2xl font-bold text-cyan-400">#{stats.rank}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white">Total Games</span>
                      <span className="text-2xl font-bold text-white">{stats.totalGames}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white">Win Rate</span>
                      <span className="text-2xl font-bold text-white">{stats.winRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Dark Mode
                    </label>
                    <span className="text-sm text-gray-500">
                      Application is always in dark mode
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">
                      Notifications
                    </label>
                    <input type="checkbox" className="w-12 h-6 bg-gray-600 rounded-full appearance-none checked:bg-cyan-500 transition-all" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">
                      Sound Effects
                    </label>
                    <input type="checkbox" className="w-12 h-6 bg-gray-600 rounded-full appearance-none checked:bg-cyan-500 transition-all" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

