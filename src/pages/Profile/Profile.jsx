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
  IoClose
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
      
      console.log('==========================================');
      console.log('CLIENT: Starting profile update');
      console.log('Current profileData state:', JSON.stringify(profileData, null, 2));
      console.log('==========================================');
      
      // Ensure we're sending all required fields
      const dataToSend = {
        username: profileData.username.trim(),
        email: profileData.email.trim(),
        photoURL: profileData.photoURL || null
      };
      
      console.log('Data to send to server:', JSON.stringify(dataToSend, null, 2));
      
      // Update server with all profile data including photoURL
      const response = await apiService.updateProfile(dataToSend);
      console.log('Server response received:', JSON.stringify(response, null, 2));
      
      if (!response || !response.user) {
        console.error('Invalid response structure from server');
        throw new Error('Invalid response from server');
      }
      
      console.log('Server update successful!');
      console.log('Updated user data from server:', JSON.stringify(response.user, null, 2));
      
      // Update Firebase profile with both displayName and photoURL
      if (user && response.user) {
        try {
          const updateData = {
            displayName: response.user.username,
          };
          
          // Only update photoURL if it exists
          if (response.user.photoURL) {
            updateData.photoURL = response.user.photoURL;
          }
          
          console.log('Updating Firebase profile with:', updateData);
          await updateProfile(user, updateData);
          console.log('Firebase profile updated successfully');
        } catch (firebaseError) {
          console.error('Firebase update error:', firebaseError);
          // Continue even if Firebase update fails
        }
      }
      
      // Update local state with the response from server
      const newProfileData = {
        username: response.user.username,
        email: response.user.email,
        photoURL: response.user.photoURL || null,
      };
      
      console.log('Updating local state with:', JSON.stringify(newProfileData, null, 2));
      setUserData(response.user);
      setProfileData(newProfileData);
      
      // Reload user data from server to verify persistence
      console.log('Reloading user data from server to verify...');
      try {
        await loadUserData();
        console.log('User data reloaded successfully from server');
      } catch (reloadError) {
        console.error('Error reloading user data:', reloadError);
        // Continue even if reload fails
      }
      
      console.log('==========================================');
      console.log('CLIENT: Profile update completed successfully');
      console.log('==========================================');
      
      setSuccess('Profile updated successfully!');
      setEditMode(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('==========================================');
      console.error('CLIENT ERROR updating profile:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('==========================================');
      setError('Failed to update profile: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      setError('');
      
      const imageUrl = await uploadImageToImgBB(file);
      
      // Update local state immediately with the new photoURL
      const updatedProfileData = { ...profileData, photoURL: imageUrl };
      setProfileData(updatedProfileData);
      
      // Save to server
      const response = await apiService.updateProfile(updatedProfileData);
      
      // Update Firebase profile if user exists
      if (user) {
        try {
          await updateProfile(user, {
            photoURL: imageUrl
          });
          console.log('Firebase profile updated with new photo');
        } catch (firebaseError) {
          console.error('Firebase update error:', firebaseError);
          // Continue even if Firebase update fails
        }
      }
      
      // Update userData with the response from server
      if (response && response.user) {
        setUserData(response.user);
      }
      
      setSuccess('Profile photo uploaded and saved!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Delete from our database (server will handle Firebase deletion)
      await apiService.deleteAccount();
      
      // Logout and redirect (logout will handle Firebase auth state)
      await logout();
      navigate('/login');
      
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account: ' + (error.message || 'Please try again'));
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <IoPerson className="text-4xl text-cyan-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Profile
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-400">
            Manage your account and view your statistics.
          </p>
        </motion.div>

        {/* Success/Error Messages */}
        {success && (
          <motion.div 
            className="mb-6 bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <IoCheckmarkCircle className="text-xl" />
            {success}
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="mb-6 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <IoCloseCircle className="text-xl" />
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  <div className="flex gap-2">
                    {!editMode ? (
                      <button
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50"
                        onClick={() => setEditMode(true)}
                        disabled={loading}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all border border-gray-600 disabled:opacity-50"
                          onClick={() => setEditMode(false)}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50" 
                          onClick={handleSave}
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="avatar placeholder relative w-24 h-24 group">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {profileData.photoURL || userData?.photoURL ? (
                      <div className="relative w-full h-full">
                        <img
                          src={profileData.photoURL || userData?.photoURL}
                          alt={profileData.username}
                          className="w-full h-full rounded-full border-4 border-cyan-500 shadow-lg object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {uploading && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                          </div>
                        )}
                      </div>
                    ) : null}
                    <div className={`absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg ${profileData.photoURL || userData?.photoURL ? 'hidden' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    {editMode && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-full text-white shadow-lg hover:bg-cyan-600 transition-all disabled:opacity-50"
                      >
                        <IoCamera className="text-lg" />
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{profileData.username}</p>
                    <p className="text-sm text-gray-400">{profileData.email}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
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
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all"
                        value={profileData.username}
                        onChange={(e) =>
                          setProfileData({ ...profileData, username: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <IoMail className="text-sm" />
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="font-semibold flex items-center gap-2">
                        <IoPerson className="text-sm" />
                        Username
                      </span>
                      <span>{profileData.username}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="font-semibold flex items-center gap-2">
                        <IoMail className="text-sm" />
                        Email
                      </span>
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="font-semibold">Status</span>
                      <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">Active</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-semibold">User ID</span>
                      <span className="text-xs text-gray-400 font-mono">{userData?.userId}</span>
                    </div>
                  </div>
                )}

                {/* Delete Account Section */}
                <div className="mt-8 pt-6 border-t border-red-500/20">
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <IoWarning className="text-red-400 text-xl" />
                      <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={loading}
                    >
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
            {/* Quick Stats */}
            {stats && (
              <motion.div 
                className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <IoStatsChart className="text-xl text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Quick Stats</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white flex items-center gap-2">
                        <IoTrophy className="text-sm" />
                        Rank
                      </span>
                      <span className="text-2xl font-bold text-cyan-400">#{stats.rank}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white flex items-center gap-2">
                        <BsPeopleFill className="text-sm" />
                        Total Games
                      </span>
                      <span className="text-2xl font-bold text-white">{stats.totalGames}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white flex items-center gap-2">
                        <IoStatsChart className="text-sm" />
                        Win Rate
                      </span>
                      <span className="text-2xl font-bold text-white">{stats.winRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white flex items-center gap-2">
                        <IoTrophy className="text-sm" />
                        Wins
                      </span>
                      <span className="text-2xl font-bold text-green-400">{stats.wins}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white flex items-center gap-2">
                        <BsGraphDown className="text-sm" />
                        Losses
                      </span>
                      <span className="text-2xl font-bold text-red-400">{stats.losses}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white flex items-center gap-2">
                        <BsPeopleFill className="text-sm" />
                        Draws
                      </span>
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
              className="bg-gray-800 border border-red-500 rounded-lg p-6 max-w-md w-full mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <IoWarning className="text-red-400 text-2xl" />
                <h3 className="text-xl font-bold text-red-400">Delete Account</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and will permanently remove:
              </p>
              
              <ul className="text-gray-400 text-sm mb-6 space-y-1">
                <li>• Your profile and personal information</li>
                <li>• All game statistics and match history</li>
                <li>• Your Firebase authentication account</li>
                <li>• All associated data</li>
              </ul>
              
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <IoTrash className="text-sm" />
                      Delete Account
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

