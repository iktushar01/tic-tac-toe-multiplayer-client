import { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { apiService } from '../services/api';

const Profile = () => {
  const [stats, setStats] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'Player',
    email: 'player@example.com',
    avatar: null,
  });

  useEffect(() => {
    apiService.getUserStats().then(setStats);
  }, []);

  const handleSave = () => {
    // In a real app, this would update the backend
    alert('Profile updated! (This is a demo)');
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-lg text-base-content/70">
            Manage your account and view your statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <div className="flex gap-2">
                    {!editMode ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => setEditMode(true)}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                          Save
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="avatar placeholder">
                    <div className="w-24 rounded-full bg-primary text-white text-4xl">
                      <span>{profileData.username.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{profileData.username}</p>
                    <p className="text-sm text-base-content/70">{profileData.email}</p>
                    <p className="text-sm text-base-content/50">
                      Member since {new Date().getFullYear()}
                    </p>
                  </div>
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Username</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={profileData.username}
                        onChange={(e) =>
                          setProfileData({ ...profileData, username: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        className="input input-bordered"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-base-300">
                      <span className="font-semibold">Username</span>
                      <span>{profileData.username}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-base-300">
                      <span className="font-semibold">Email</span>
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-base-300">
                      <span className="font-semibold">Status</span>
                      <span className="badge badge-success badge-lg">Active</span>
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
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Rank</span>
                      <span className="text-2xl font-bold text-primary">#{stats.rank}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Total Games</span>
                      <span className="text-2xl font-bold">{stats.totalGames}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Win Rate</span>
                      <span className="text-2xl font-bold">{stats.winRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Settings</h3>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Dark Mode</span>
                      <span className="label-text-alt text-base-content/50">
                        Use the toggle in the navbar
                      </span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Notifications</span>
                      <input type="checkbox" className="toggle toggle-primary" />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Sound Effects</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        defaultChecked
                      />
                    </label>
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

