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
};

