import { useState, useEffect } from 'react';
import { apiService } from '../../../services/api';
import socketService from '../../../services/socketService';

export const useDashboardData = (user) => {
  const [stats, setStats] = useState(null);
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [computerGames, setComputerGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gamesPage, setGamesPage] = useState(1);
  const [gamesPagination, setGamesPagination] = useState(null);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [currentUserData, statsData, usersData, friendsData, receivedRequestsData, sentRequestsData, gamesData] = await Promise.all([
        apiService.getCurrentUser().catch(() => ({ user: null })),
        apiService.getUserStats(user.uid).catch(() => ({ wins: 0, losses: 0, draws: 0, winRate: 0, totalGames: 0 })),
        apiService.getAllUsers().catch(() => ({ users: [] })),
        apiService.getFriendsList().catch(() => ({ friends: [] })),
        apiService.getReceivedFriendRequests().catch(() => ({ requests: [] })),
        apiService.getSentFriendRequests().catch(() => ({ requests: [] })),
        apiService.getComputerGameHistory(1, 20).catch(() => ({ games: [], pagination: null }))
      ]);

      setUserData(currentUserData.user);
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

  useEffect(() => {
    if (user) {
      loadDashboardData();
      
      // Connect to Socket.io
      socketService.connect(user.uid);
      
      // Set up real-time event listeners
      const handleFriendRequestReceived = (data) => {
        console.log('Friend request received:', data);
        loadDashboardData();
      };
      
      const handleFriendRequestResponse = (data) => {
        console.log('Friend request response:', data);
        loadDashboardData();
      };
      
      const handleGameChallenge = (data) => {
        console.log('Game challenge received:', data);
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

  return {
    stats,
    userData,
    allUsers,
    friends,
    receivedRequests,
    sentRequests,
    computerGames,
    loading,
    error,
    gamesPage,
    gamesPagination,
    loadDashboardData
  };
};

