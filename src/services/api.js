// API service - backend integration

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

// Helper function to get Firebase ID token
const getIdToken = async () => {
  const { auth } = await import('../firebase');
  const { currentUser } = auth;
  if (currentUser) {
    return await currentUser.getIdToken();
  }
  return null;
};

// Helper function for authenticated requests
const authenticatedFetch = async (url, options = {}) => {
  const token = await getIdToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

export const apiService = {
  // Authentication
  loginWithToken: async (idToken) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to login with server');
    }

    return await response.json();
  },

  getCurrentUser: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/me`);
    
    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    return await response.json();
  },

  updateProfile: async (profileData) => {
    console.log('=== API Service: updateProfile called ===');
    console.log('Profile data to send:', profileData);
    
    const response = await authenticatedFetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Update profile failed:', errorData);
      throw new Error(errorData.error || 'Failed to update profile');
    }

    const result = await response.json();
    console.log('Update profile response:', result);
    console.log('=== API Service: updateProfile completed ===');
    
    return result;
  },

  deleteAccount: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/me`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete account');
    }

    return await response.json();
  },

  // Game
  createGame: async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          gameId: Math.random().toString(36).substr(2, 9),
          roomCode: Math.floor(1000 + Math.random() * 9000).toString(),
        });
      }, 300)
    );
  },

  joinGame: async (roomCode) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (roomCode.length === 4) {
          resolve({
            gameId: Math.random().toString(36).substr(2, 9),
            roomCode: roomCode,
          });
        } else {
          reject(new Error('Invalid room code'));
        }
      }, 300);
    });
  },

  quickMatch: async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          gameId: Math.random().toString(36).substr(2, 9),
          opponent: 'Opponent',
        });
      }, 500)
    );
  },

  // User data
  getUserStats: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/stats`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Return default stats on error
      return {
        wins: 0,
        losses: 0,
        draws: 0,
        winRate: 0,
        rank: 0,
        totalGames: 0,
      };
    }
  },

  getMatchHistory: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/history`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch match history');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching match history:', error);
      return [];
    }
  },

  // Friend System APIs
  getAllUsers: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/all`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return await response.json();
  },

  sendFriendRequest: async (userId) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/friends/request/${userId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to send friend request');
    }

    return await response.json();
  },

  cancelFriendRequest: async (userId) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/friends/cancel/${userId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to cancel friend request');
    }

    return await response.json();
  },

  acceptFriendRequest: async (userId) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/friends/accept/${userId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to accept friend request');
    }

    return await response.json();
  },

  rejectFriendRequest: async (userId) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/friends/reject/${userId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to reject friend request');
    }

    return await response.json();
  },

  unfriend: async (userId) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/friends/unfriend/${userId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to unfriend');
    }

    return await response.json();
  },

  getFriendsList: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/friends/list`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch friends list');
    }

    return await response.json();
  },

  getReceivedFriendRequests: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/friends/requests/received`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch received friend requests');
    }

    return await response.json();
  },

  getSentFriendRequests: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/friends/requests/sent`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sent friend requests');
    }

    return await response.json();
  },

  // Computer Game APIs
  createComputerGame: async (boardSize, aiDifficulty, playerSymbol = 'X') => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/computer-game/create`, {
      method: 'POST',
      body: JSON.stringify({ boardSize, aiDifficulty, playerSymbol }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to create computer game');
    }

    return await response.json();
  },

  makeComputerGameMove: async (gameId, index, player) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/computer-game/move`, {
      method: 'POST',
      body: JSON.stringify({ gameId, index, player }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to make move');
    }

    return await response.json();
  },

  completeComputerGame: async (gameId, result, winner, finalBoard) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/computer-game/complete`, {
      method: 'POST',
      body: JSON.stringify({ gameId, result, winner, finalBoard }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to complete game');
    }

    return await response.json();
  },

  getComputerGameHistory: async (page = 1, limit = 20, status = null) => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (status) params.append('status', status);
    
    const response = await authenticatedFetch(`${API_BASE_URL}/users/computer-games?${params}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch computer games');
    }

    return await response.json();
  },

  getComputerGameDetails: async (gameId) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/computer-game/${gameId}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch game details');
    }

    return await response.json();
  },

  // Game Result API - Legacy endpoint for backward compatibility
  saveGameResult: async (result, opponent = 'Computer', moves = 0, gameMode = 'computer') => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/game/result`, {
      method: 'POST',
      body: JSON.stringify({ result, opponent, moves, gameMode }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to save game result');
    }

    return await response.json();
  },

  // Leaderboard API
  getLeaderboard: async (sortBy = 'wins', limit = 50) => {
    const response = await fetch(`${API_BASE_URL}/users/leaderboard?sortBy=${sortBy}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }

    return await response.json();
  },

  // ==================== COIN BETTING SYSTEM ====================

  // Get coin balance
  getCoinBalance: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/coins/balance`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin balance');
    }

    return await response.json();
  },

  // Place bet
  placeBet: async (betAmount, gameId) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/coins/bet/place`, {
      method: 'POST',
      body: JSON.stringify({ betAmount, gameId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to place bet');
    }

    return await response.json();
  },

  // Complete bet after game ends
  completeBet: async (betAmount, result, gameId = null) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/coins/bet/complete`, {
      method: 'POST',
      body: JSON.stringify({ betAmount, result, gameId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to complete bet');
    }

    return await response.json();
  },

  // Add coins (admin/reward)
  addCoins: async (amount, reason = 'reward') => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/coins/add`, {
      method: 'POST',
      body: JSON.stringify({ amount, reason }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to add coins');
    }

    return await response.json();
  },

  // Deduct coins (admin)
  deductCoins: async (amount, reason = 'deduction') => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/coins/deduct`, {
      method: 'POST',
      body: JSON.stringify({ amount, reason }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to deduct coins');
    }

    return await response.json();
  },

  // Reset coins
  resetCoins: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/coins/reset`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to reset coins');
    }

    return await response.json();
  },

  // Daily coin claim
  claimDailyCoins: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/coins/daily-claim`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || 'Failed to claim daily reward');
    }

    return await response.json();
  },

  // Check daily claim status
  getDailyClaimStatus: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/users/coins/daily-claim/status`);
    
    if (!response.ok) {
      throw new Error('Failed to check daily claim status');
    }

    return await response.json();
  },
};

