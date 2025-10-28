import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicTacToeBoard from '../components/TicTacToeBoard';

const GameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState('playing'); // playing, waiting, finished
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [opponent, setOpponent] = useState('Opponent');
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const username = 'Player'; // You can replace this with Firebase later

  // Simulate opponent after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState('playing');
      setOpponent('Player2');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMove = (index, result) => {
    if (result) {
      setGameState('finished');
    } else {
      // Switch player
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        { user: username, text: message, time: new Date() },
      ]);
      setMessage('');
    }
  };

  const leaveRoom = () => {
    if (window.confirm('Are you sure you want to leave the game?')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Room Header */}
        <div className="card bg-gradient-to-r from-primary to-secondary shadow-2xl mb-6 text-white">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-white">🎮 Game Room</h1>
              <div className="badge badge-warning badge-lg">
                {gameState === 'waiting' && '⏳ Waiting for opponent...'}
                {gameState === 'playing' && `🏆 Room: ${gameId}`}
                {gameState === 'finished' && '✅ Game Over'}
              </div>
            </div>

            <button className="btn btn-error btn-sm hover:scale-105 transition-transform shadow-xl" onClick={leaveRoom}>
              🚪 Leave Room
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center">
                <div className="w-full mb-6">
                  {/* Player Info */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                          <span className="text-lg font-bold">
                            {username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-lg">You ({playerSymbol})</p>
                        <p className="text-sm text-base-content/70">
                          {currentPlayer === playerSymbol
                            ? '🎯 Your Turn'
                            : "⏳ Opponent's Turn"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-bold">
                          {opponent} ({currentPlayer === 'X' ? 'O' : 'X'})
                        </p>
                        <p className="text-sm text-base-content/70">
                          {currentPlayer !== playerSymbol
                            ? 'Opponent Turn'
                            : 'Your Turn'}
                        </p>
                      </div>
                      <div className="avatar placeholder">
                        <div className="w-12 rounded-full bg-gradient-to-br from-accent to-secondary text-white shadow-lg">
                          <span className="text-lg font-bold">
                            {opponent.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Turn Indicator */}
                  <div className="alert alert-info mb-4">
                    <span>
                      {currentPlayer === playerSymbol
                        ? '🎯 Your turn to play!'
                        : '⏳ Waiting for opponent...'}
                    </span>
                  </div>

                  {/* Board */}
                  <TicTacToeBoard
                    onMove={handleMove}
                    disabled={currentPlayer !== playerSymbol || gameState !== 'playing'}
                    currentPlayer={currentPlayer}
                    playerSymbol={playerSymbol}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Game Chat</h2>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-2 h-64 border rounded-lg p-4">
                {chatMessages.length === 0 ? (
                  <p className="text-base-content/50 text-center">
                    No messages yet. Start chatting!
                  </p>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{msg.user}</span>
                        <span className="text-xs text-base-content/50">
                          {msg.time.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm bg-base-200 p-2 rounded">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="input input-bordered flex-1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;

