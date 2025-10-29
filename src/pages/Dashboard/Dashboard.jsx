import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import socketService from '../../services/socketService';
import { useAuth } from '../../context/AuthContext';
import { 
  IoStatsChart, 
  IoTrophy, 
  IoPeople, 
  IoPersonAdd,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoGameController,
  IoRefresh,
  IoTime,
  IoGrid,
  IoCog,
  IoEye
} from 'react-icons/io5';
import { BsGraphDown, BsTrophyFill, BsPeopleFill, BsClockHistory } from 'react-icons/bs';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [computerGames, setComputerGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [error, setError] = useState(null);
  const [gamesPage, setGamesPage] = useState(1);
  const [gamesPagination, setGamesPagination] = useState(null);

  useEffect(() => {
    if (user) {
      loadDashboardData();
      
      // Connect to Socket.io
      socketService.connect(user.uid);
      
      // Set up real-time event listeners
      const handleFriendRequestReceived = (data) => {
        console.log('Friend request received:', data);
        // Refresh friend requests
        loadDashboardData();
      };
      
      const handleFriendRequestResponse = (data) => {
        console.log('Friend request response:', data);
        // Refresh all data
        loadDashboardData();
      };
      
      const handleGameChallenge = (data) => {
        console.log('Game challenge received:', data);
        // Show notification or redirect to game
        alert(`You have been challenged to a game! Game ID: ${data.gameId}`);
      };
      
      socketService.on('friend-request-received', handleFriendRequestReceived);
      socketService.on('friend-request-response', handleFriendRequestResponse);
      socketService.on('game-challenge', handleGameChallenge);
      
      // Cleanup on unmount
      return () => {
        socketService.off('friend-request-received', handleFriendRequestReceived);
        socketService.off('friend-request-response', handleFriendRequestResponse);
        socketService.off('game-challenge', handleGameChallenge);
      };
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [statsData, usersData, friendsData, receivedRequestsData, sentRequestsData, gamesData] = await Promise.all([
        apiService.getUserStats(user.uid).catch(() => ({ wins: 0, losses: 0, draws: 0, winRate: 0, totalGames: 0 })),
        apiService.getAllUsers().catch(() => ({ users: [] })),
        apiService.getFriendsList().catch(() => ({ friends: [] })),
        apiService.getReceivedFriendRequests().catch(() => ({ requests: [] })),
        apiService.getSentFriendRequests().catch(() => ({ requests: [] })),
        apiService.getComputerGameHistory(1, 20).catch(() => ({ games: [], pagination: null }))
      ]);

      setStats(statsData);
      setAllUsers(usersData.users || []);
      setFriends(friendsData.friends || []);
      setReceivedRequests(receivedRequestsData.requests || []);
      setSentRequests(sentRequestsData.requests || []);
      setComputerGames(gamesData.games || []);
      setGamesPagination(gamesData.pagination);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = async (targetUserId) => {
    try {
      await apiService.sendFriendRequest(targetUserId);
      // Send Socket.io notification
      socketService.sendFriendRequestNotification(user.uid, targetUserId);
      // Refresh data to update UI
      await loadDashboardData();
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert(error.message || 'Failed to send friend request');
    }
  };

  const handleAcceptFriendRequest = async (requesterUserId) => {
    try {
      await apiService.acceptFriendRequest(requesterUserId);
      // Send Socket.io notification
      socketService.sendFriendRequestResponseNotification(user.uid, requesterUserId, 'accept');
      // Refresh data to update UI
      await loadDashboardData();
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert(error.message || 'Failed to accept friend request');
    }
  };

  const handleRejectFriendRequest = async (requesterUserId) => {
    try {
      await apiService.rejectFriendRequest(requesterUserId);
      // Send Socket.io notification
      socketService.sendFriendRequestResponseNotification(user.uid, requesterUserId, 'reject');
      // Refresh data to update UI
      await loadDashboardData();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      alert(error.message || 'Failed to reject friend request');
    }
  };

  const handleCancelFriendRequest = async (targetUserId) => {
    try {
      await apiService.cancelFriendRequest(targetUserId);
      // Refresh data to update UI
      await loadDashboardData();
    } catch (error) {
      console.error('Error cancelling friend request:', error);
      alert(error.message || 'Failed to cancel friend request');
    }
  };

  const handleUnfriend = async (friendUserId) => {
    try {
      if (confirm('Are you sure you want to remove this friend?')) {
        await apiService.unfriend(friendUserId);
        // Refresh data to update UI
        await loadDashboardData();
      }
    } catch (error) {
      console.error('Error unfriending:', error);
      alert(error.message || 'Failed to remove friend');
    }
  };

  const handleChallengeFriend = (friendUserId) => {
    // Send Socket.io notification
    socketService.sendGameChallengeNotification(user.uid, friendUserId, `game-${Date.now()}`);
    // Navigate to game room with friend
    navigate(`/game/multiplayer/${friendUserId}`);
  };

  const refreshData = () => {
    loadDashboardData();
  };

  const loadMoreGames = async () => {
    if (!gamesPagination?.hasNext) return;
    
    try {
      const nextPage = gamesPage + 1;
      const gamesData = await apiService.getComputerGameHistory(nextPage, 20);
      
      setComputerGames(prev => [...prev, ...gamesData.games]);
      setGamesPagination(gamesData.pagination);
      setGamesPage(nextPage);
    } catch (error) {
      console.error('Error loading more games:', error);
    }
  };

  const formatDuration = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getResultIcon = (result) => {
    switch (result) {
      case 'win':
        return <IoTrophy className="text-green-400 text-lg" />;
      case 'loss':
        return <IoCloseCircle className="text-red-400 text-lg" />;
      case 'draw':
        return <IoTime className="text-orange-400 text-lg" />;
      default:
        return <IoGameController className="text-gray-400 text-lg" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button 
            onClick={refreshData}
            className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-8 text-center sm:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <IoStatsChart className="text-4xl text-cyan-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            </div>
            <button
              onClick={refreshData}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="Refresh"
            >
              <IoRefresh className="text-gray-300 text-xl" />
            </button>
          </div>
          <p className="text-base sm:text-lg text-gray-400">
            Manage your friends and view your game statistics.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Wins</p>
                  <p className="text-2xl font-bold text-green-400">{stats?.wins || 0}</p>
                </div>
                <IoTrophy className="text-green-400 text-2xl" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Losses</p>
                  <p className="text-2xl font-bold text-red-400">{stats?.losses || 0}</p>
                </div>
                <BsGraphDown className="text-red-400 text-2xl" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-orange-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Draws</p>
                  <p className="text-2xl font-bold text-orange-400">{stats?.draws || 0}</p>
                </div>
                <BsPeopleFill className="text-orange-400 text-2xl" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-2xl font-bold text-cyan-400">{stats?.winRate || 0}%</p>
                </div>
                <IoStatsChart className="text-cyan-400 text-2xl" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Match History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gray-800 border border-gray-700 rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <BsClockHistory className="text-purple-400" />
                Match History ({computerGames.length})
              </h2>
              {computerGames.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎮</div>
                  <p className="text-gray-400 text-lg">No computer games played yet.</p>
                  <p className="text-gray-500 text-sm mt-2">Start playing against the AI to see your match history!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {computerGames.slice(0, 5).map((game) => (
                    <div key={game.gameId} className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:border-purple-500/50 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getResultIcon(game.result)}
                          <div>
                            <h3 className="font-semibold text-white">
                              {game.result ? game.result.charAt(0).toUpperCase() + game.result.slice(1) : 'In Progress'}
                            </h3>
                            <p className="text-sm text-gray-400">Game ID: {game.gameId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">
                            {game.completedAt ? formatDate(game.completedAt) : formatDate(game.createdAt)}
                          </p>
                          {game.gameDuration && (
                            <p className="text-xs text-gray-500">
                              Duration: {formatDuration(game.gameDuration)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <IoGrid className="text-cyan-400" />
                          <span className="text-gray-300">
                            <span className="text-white font-semibold">{game.boardSize}×{game.boardSize}</span> Board
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoCog className={`${getDifficultyColor(game.aiDifficulty)}`} />
                          <span className="text-gray-300">
                            <span className={`font-semibold ${getDifficultyColor(game.aiDifficulty)}`}>
                              {game.aiDifficulty.charAt(0).toUpperCase() + game.aiDifficulty.slice(1)}
                            </span> AI
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoGameController className="text-orange-400" />
                          <span className="text-gray-300">
                            <span className="text-white font-semibold">{game.totalMoves}</span> Moves
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoTime className="text-blue-400" />
                          <span className="text-gray-300">
                            Status: <span className={`font-semibold ${
                              game.status === 'completed' ? 'text-green-400' : 
                              game.status === 'playing' ? 'text-yellow-400' : 'text-gray-400'
                            }`}>
                              {game.status}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {computerGames.length > 5 && (
                    <div className="text-center mt-4">
                      <p className="text-gray-400 text-sm">
                        Showing 5 of {computerGames.length} games
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'users', label: 'All Users', icon: IoPeople },
              { id: 'requests', label: 'Friend Requests', icon: IoPersonAdd },
              { id: 'friends', label: 'Friends', icon: BsPeopleFill }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.id === 'requests' && receivedRequests.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {receivedRequests.length}
                    </span>
                  )}
                </button>
              );
            })}
              </div>
            </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'users' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <IoPeople className="text-cyan-400" />
                  All Users
                </h2>
                {allUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <p className="text-gray-400 text-lg">No other users found.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allUsers.map((user) => (
                      <div key={user.userId} className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          {user.photoURL ? (
                            <img 
                              src={user.photoURL} 
                              alt={user.username}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-white">{user.username}</h3>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                          <span>Wins: {user.stats?.wins || 0}</span>
                          <span>Rate: {user.stats?.winRate || 0}%</span>
                        </div>
                        {friends.some(f => f.userId === user.userId) ? (
                          <button
                            disabled
                            className="w-full bg-gray-600 text-gray-400 py-2 px-4 rounded-lg cursor-not-allowed"
                          >
                            Already Friends
                          </button>
                        ) : sentRequests.some(r => r.userId === user.userId) ? (
                          <button
                            onClick={() => handleCancelFriendRequest(user.userId)}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <IoCloseCircle className="text-lg" />
                            Cancel Request
                          </button>
                        ) : receivedRequests.some(r => r.userId === user.userId) ? (
                          <button
                            onClick={() => handleAcceptFriendRequest(user.userId)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <IoCheckmarkCircle className="text-lg" />
                            Accept Request
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSendFriendRequest(user.userId)}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <IoPersonAdd className="text-lg" />
                            Send Friend Request
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <IoPersonAdd className="text-yellow-400" />
                  Friend Requests ({receivedRequests.length})
                </h2>
                {receivedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📬</div>
                    <p className="text-gray-400 text-lg">No pending friend requests.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {receivedRequests.map((request) => (
                      <div key={request.userId} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          {request.photoURL ? (
                            <img 
                              src={request.photoURL} 
                              alt={request.username}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {request.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-white">{request.username}</h3>
                            <p className="text-sm text-gray-400">{request.email}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptFriendRequest(request.userId)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <IoCheckmarkCircle className="text-lg" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectFriendRequest(request.userId)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <IoCloseCircle className="text-lg" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <BsPeopleFill className="text-green-400" />
                  Friends ({friends.length})
                </h2>
                {friends.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👫</div>
                    <p className="text-gray-400 text-lg">No friends yet. Send some friend requests!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {friends.map((friend) => (
                      <div key={friend.userId} className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:border-green-500/50 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          {friend.photoURL ? (
                            <img 
                              src={friend.photoURL} 
                              alt={friend.username}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {friend.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-white">{friend.username}</h3>
                            <p className="text-sm text-gray-400">{friend.email}</p>
                          </div>
                </div>
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                          <span>Wins: {friend.stats?.wins || 0}</span>
                          <span>Rate: {friend.stats?.winRate || 0}%</span>
              </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleChallengeFriend(friend.userId)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <IoGameController className="text-lg" />
                            Challenge
                          </button>
                          <button
                            onClick={() => handleUnfriend(friend.userId)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <IoCloseCircle className="text-lg" />
                            Unfriend
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;