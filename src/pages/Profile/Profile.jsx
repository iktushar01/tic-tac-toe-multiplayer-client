import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { updateProfile } from 'firebase/auth';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { uploadImageToImgBB } from '../../services/imgbb';
import { 
  IoPerson, 
  IoMail, 
  IoCalendar, 
  IoStatsChart, 
  IoTrophy, 
  IoTrash,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoWarning,
  IoCamera,
  IoClose,
  IoCash
} from 'react-icons/io5';
import { BsGraphDown, BsPeopleFill, BsClockHistory } from 'react-icons/bs';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    photoURL: '',
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadUserData = useCallback(async () => {
    try {
      setLoading(true);
      const [userResponse, statsResponse] = await Promise.all([
        apiService.getCurrentUser(),
        apiService.getUserStats(user.uid)
      ]);
      setUserData(userResponse.user);
      setStats(statsResponse);
      setProfileData({
        username: userResponse.user.username,
        email: userResponse.user.email,
        photoURL: userResponse.user.photoURL,
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user, loadUserData]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      const dataToSend = {
        username: profileData.username.trim(),
        email: profileData.email.trim(),
        photoURL: profileData.photoURL || null
      };
      const response = await apiService.updateProfile(dataToSend);
      if (user && response.user) {
        try {
          const updateData = { displayName: response.user.username };
          if (response.user.photoURL) updateData.photoURL = response.user.photoURL;
          await updateProfile(user, updateData);
        } catch (err) { console.error('Firebase profile update failed:', err); }
      }
      const newProfileData = {
        username: response.user.username,
        email: response.user.email,
        photoURL: response.user.photoURL || null,
      };
      setUserData(response.user);
      setProfileData(newProfileData);
      try { await loadUserData(); } catch (err) { console.error('Reload user data failed:', err); }
      setSuccess('Profile updated successfully!');
      setEditMode(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update profile: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image size should be less than 5MB'); return; }
    try {
      setUploading(true);
      setError('');
      const imageUrl = await uploadImageToImgBB(file);
      const updatedProfileData = { ...profileData, photoURL: imageUrl };
      setProfileData(updatedProfileData);
      const response = await apiService.updateProfile(updatedProfileData);
      if (user) {
        try { await updateProfile(user, { photoURL: imageUrl }); } catch (err) { console.error('Firebase photo update failed:', err); }
      }
      if (response && response.user) setUserData(response.user);
      setSuccess('Profile photo uploaded and saved!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to upload image. Please try again. ' + (error?.message ? `(${error.message})` : ''));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      setError('');
      await apiService.deleteAccount();
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to delete account: ' + (error.message || 'Please try again'));
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="profileGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#profileGrid)" />
          </svg>
        </div>
        {/* Glow orbs */}
        <motion.div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20" animate={{ scale: [1,1.2,1], x:[0,-50,0], opacity:[0.2,0.3,0.2] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }} />
        <motion.div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20" animate={{ scale:[1,1.3,1], x:[0,50,0], opacity:[0.2,0.3,0.2] }} transition={{ duration:10, repeat:Infinity, ease:'easeInOut' }} />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="profileGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#profileGrid)" />
        </svg>
      </div>
      {/* Glow orbs */}
      <motion.div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20" animate={{ scale:[1,1.2,1], x:[0,-60,0], opacity:[0.2,0.3,0.2] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }} />
      <motion.div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20" animate={{ scale:[1,1.3,1], x:[0,60,0], opacity:[0.2,0.3,0.2] }} transition={{ duration:10, repeat:Infinity, ease:'easeInOut' }} />

      <div className="relative z-10 min-h-screen py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <div className="p-1.5 sm:p-2 bg-cyan-500/20 rounded-lg">
                <IoPerson className="text-3xl sm:text-4xl text-cyan-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Profile
              </h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-400">
              Manage your account and view your statistics.
            </p>
          </motion.div>

          {/* Success/Error Messages */}
          {success && (
            <motion.div 
              className="relative group mb-6 bg-green-900/30 border border-green-700 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2 overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100" initial={{ x:'-100%' }} animate={{ x:['-120%','200%'] }} transition={{ duration:1.2, repeat:Infinity, repeatDelay:1.2 }} />
              <IoCheckmarkCircle className="text-xl relative z-10" />
              <span className="relative z-10">{success}</span>
            </motion.div>
          )}

          {error && (
            <motion.div 
              className="relative group mb-6 bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100" initial={{ x:'-100%' }} animate={{ x:['-120%','200%'] }} transition={{ duration:1.2, repeat:Infinity, repeatDelay:1.2 }} />
              <IoCloseCircle className="text-xl relative z-10" />
              <span className="relative z-10">{error}</span>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <motion.div 
                className="relative group bg-gray-900/70 backdrop-blur border border-cyan-700/40 rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background:'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }} animate={{ x:['-100%','100%'] }} transition={{ duration:1.5, repeat:Infinity }} />
                <div className="p-4 sm:p-5 md:p-6 relative z-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Personal Information</h2>
                    <div className="flex gap-2 w-full sm:w-auto">
                      {!editMode ? (
                        <button
                          className="px-3 sm:px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
                          onClick={() => setEditMode(true)}
                          disabled={loading}
                        >
                          Edit Profile
                        </button>
                      ) : (
                        <>
                          <button
                            className="px-3 sm:px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all border border-gray-600 disabled:opacity-50 text-sm sm:text-base flex-1 sm:flex-none"
                            onClick={() => setEditMode(false)}
                            disabled={loading}
                          >
                            Cancel
                          </button>
                          <button 
                            className="px-3 sm:px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 text-sm sm:text-base flex-1 sm:flex-none" 
                            onClick={handleSave}
                            disabled={loading}
                          >
                            {loading ? 'Saving...' : 'Save'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                    <div className="avatar placeholder relative w-20 h-20 sm:w-24 sm:h-24 group/avatar">
                      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                      {profileData.photoURL || userData?.photoURL ? (
                        <div className="relative w-full h-full">
                          <img src={profileData.photoURL || userData?.photoURL} alt={profileData.username} className="w-full h-full rounded-full border-4 border-cyan-500 shadow-lg object-cover" onError={(e)=>{ e.target.style.display='none'; }} />
                          {uploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                          )}
                        </div>
                      ) : null}
                      <div className={`absolute inset-0 w-full h-full rounded-full bg-linear-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg ${profileData.photoURL || userData?.photoURL ? 'hidden' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      </div>
                      {editMode && (
                        <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-full text-white shadow-lg hover:bg-cyan-600 transition-all disabled:opacity-50">
                          <IoCamera className="text-lg" />
                        </button>
                      )}
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-base sm:text-lg font-bold text-white">{profileData.username}</p>
                      <p className="text-xs sm:text-sm text-gray-400 break-all">{profileData.email}</p>
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
                        <IoCalendar className="text-xs" />
                        Member since {userData ? new Date(userData.createdAt).getFullYear() : new Date().getFullYear()}
                      </p>
                    </div>
                  </div>

                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <IoPerson className="text-sm" />
                          Username
                        </label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all" value={profileData.username} onChange={(e)=> setProfileData({ ...profileData, username: e.target.value })} disabled={loading} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <IoMail className="text-sm" />
                          Email
                        </label>
                        <input type="email" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all" value={profileData.email} onChange={(e)=> setProfileData({ ...profileData, email: e.target.value })} disabled={loading} />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b border-gray-700">
                        <span className="font-semibold text-white flex items-center gap-2"><IoPerson className="text-sm" /> Username</span>
                        <span className="text-white">{profileData.username}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-700">
                        <span className="font-semibold text-white flex items-center gap-2"><IoMail className="text-sm" /> Email</span>
                        <span className="text-white">{profileData.email}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-700">
                        <span className="font-semibold text-white">Status</span>
                        <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">Active</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="font-semibold text-white">User ID</span>
                        <span className="text-xs text-white font-mono">{userData?.userId}</span>
                      </div>
                    </div>
                  )}

                  {/* Danger Zone */}
                  <div className="mt-8 pt-6 border-t border-red-500/20">
                    <div className="relative group bg-red-900/20 border border-red-500/30 rounded-lg p-4 overflow-hidden">
                      <motion.div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100" initial={{ x:'-100%' }} animate={{ x:['-120%','200%'] }} transition={{ duration:1.2, repeat:Infinity, repeatDelay:1.2 }} />
                      <div className="flex items-center gap-2 mb-3 relative z-10">
                        <IoWarning className="text-red-400 text-xl" />
                        <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-4 relative z-10">Once you delete your account, there is no going back. Please be certain.</p>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50 relative z-10" onClick={() => setShowDeleteConfirm(true)} disabled={loading}>
                        <IoTrash className="text-sm" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              {stats && (
                <motion.div 
                  className="relative group bg-gray-900/70 backdrop-blur border border-cyan-700/40 rounded-lg shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background:'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }} animate={{ x:['-100%','100%'] }} transition={{ duration:1.5, repeat:Infinity }} />
                  <div className="p-6 relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <IoStatsChart className="text-xl text-cyan-400" />
                      <h3 className="text-xl font-bold text-white">Quick Stats</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-white flex items-center gap-2"><IoCash className="text-sm" /> Coins</span>
                        <span className="text-2xl font-bold text-yellow-400">{userData?.coins?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-white flex items-center gap-2"><IoTrophy className="text-sm" /> Rank</span>
                        <span className="text-2xl font-bold text-cyan-400">#{stats.rank}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-white flex items-center gap-2"><BsPeopleFill className="text-sm" /> Total Games</span>
                        <span className="text-2xl font-bold text-white">{stats.totalGames}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-white flex items-center gap-2"><IoStatsChart className="text-sm" /> Win Rate</span>
                        <span className="text-2xl font-bold text-white">{stats.winRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-white flex items-center gap-2"><IoTrophy className="text-sm" /> Wins</span>
                        <span className="text-2xl font-bold text-green-400">{stats.wins}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-white flex items-center gap-2"><BsGraphDown className="text-sm" /> Losses</span>
                        <span className="text-2xl font-bold text-red-400">{stats.losses}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-white flex items-center gap-2"><BsPeopleFill className="text-sm" /> Draws</span>
                        <span className="text-2xl font-bold text-orange-400">{stats.draws}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div 
                className="bg-gray-900/90 backdrop-blur border border-red-500 rounded-lg p-6 max-w-md w-full mx-4 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div className="absolute inset-0 opacity-0" style={{ background:'linear-gradient(90deg, transparent, rgba(239,68,68,0.25), transparent)' }} animate={{ x:['-100%','100%'] }} transition={{ duration:1.5, repeat:Infinity }} />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <IoWarning className="text-red-400 text-2xl" />
                  <h3 className="text-xl font-bold text-red-400">Delete Account</h3>
                </div>
                <p className="text-gray-300 mb-6 relative z-10">Are you sure you want to delete your account? This action cannot be undone and will permanently remove:</p>
                <ul className="text-gray-400 text-sm mb-6 space-y-1 relative z-10">
                  <li>• Your profile and personal information</li>
                  <li>• All game statistics and match history</li>
                  <li>• Your Firebase authentication account</li>
                  <li>• All associated data</li>
                </ul>
                <div className="flex gap-3 relative z-10">
                  <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all" onClick={() => setShowDeleteConfirm(false)} disabled={loading}>Cancel</button>
                  <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50" onClick={handleDeleteAccount} disabled={loading}>
                    {loading ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>Deleting...</>) : (<><IoTrash className="text-sm" />Delete Account</>)}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

