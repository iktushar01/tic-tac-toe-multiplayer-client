import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  connect(userId) {
    if (this.socket && this.isConnected) {
      return;
    }

    this.socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3000', {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
      
      // Authenticate with server
      if (userId) {
        this.socket.emit('authenticate', { userId });
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
    });

    // Set up friend system event listeners
    this.setupFriendListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  setupFriendListeners() {
    if (!this.socket) return;

    // Friend request received
    this.socket.on('friend-request-received', (data) => {
      this.emit('friend-request-received', data);
    });

    // Friend request response
    this.socket.on('friend-request-response', (data) => {
      this.emit('friend-request-response', data);
    });

    // Game challenge
    this.socket.on('game-challenge', (data) => {
      this.emit('game-challenge', data);
    });
  }

  // Generic event listener
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  // Remove event listener
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Emit event to listeners
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // Send friend request notification
  sendFriendRequestNotification(fromUserId, toUserId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send-friend-request', { fromUserId, toUserId });
    }
  }

  // Send friend request response notification
  sendFriendRequestResponseNotification(fromUserId, toUserId, action) {
    if (this.socket && this.isConnected) {
      this.socket.emit('friend-request-responded', { fromUserId, toUserId, action });
    }
  }

  // Send game challenge notification
  sendGameChallengeNotification(fromUserId, toUserId, gameId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('challenge-friend', { fromUserId, toUserId, gameId });
    }
  }

  // Game room methods (existing functionality)
  joinRoom(roomCode, userId, username) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-room', { roomCode, userId, username });
    }
  }

  makeMove(roomCode, row, col, userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('make-move', { roomCode, row, col, userId });
    }
  }

  // Game event listeners
  onPlayerJoined(callback) {
    if (this.socket) {
      this.socket.on('player-joined', callback);
    }
  }

  onGameState(callback) {
    if (this.socket) {
      this.socket.on('game-state', callback);
    }
  }

  onMoveMade(callback) {
    if (this.socket) {
      this.socket.on('move-made', callback);
    }
  }

  onPlayerLeft(callback) {
    if (this.socket) {
      this.socket.on('player-left', callback);
    }
  }

  onError(callback) {
    if (this.socket) {
      this.socket.on('error', callback);
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
