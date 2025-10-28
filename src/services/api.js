// API service - placeholder for backend integration

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

export const apiService = {
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
    // In production, this would fetch from Firestore
    return {
      wins: 45,
      losses: 30,
      draws: 15,
      winRate: 50,
      rank: 125,
      totalGames: 90,
    };
  },

  getMatchHistory: async (userId) => {
    // In production, this would fetch from Firestore
    return [
      {
        id: '1',
        opponent: 'Player2',
        result: 'Win',
        date: new Date().toISOString(),
        moves: 9,
      },
      {
        id: '2',
        opponent: 'Player3',
        result: 'Loss',
        date: new Date(Date.now() - 86400000).toISOString(),
        moves: 7,
      },
      {
        id: '3',
        opponent: 'Player4',
        result: 'Draw',
        date: new Date(Date.now() - 172800000).toISOString(),
        moves: 9,
      },
    ];
  },
};

