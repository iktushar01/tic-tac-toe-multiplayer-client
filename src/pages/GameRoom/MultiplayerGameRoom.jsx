import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicTacToeBoard from './TicTacToeBoard';
import { useAuth } from '../../context/AuthContext';

const MultiplayerGameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState('playing'); // playing, waiting, finished
  const [playerSymbol] = useState('X');
  const [opponent, setOpponent] = useState('Opponent');
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const username = user?.displayName || 'Player';

  // Simulate opponent after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState('playing');
      setOpponent('Player2');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMove = (index, result, board) => {
    if (result) {
      setGameState('finished');
    } else {
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
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Room Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl mb-6 text-white border border-gray-700 rounded-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-white">🎮 Multiplayer Room</h1>
              <div className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-semibold">
                {gameState === 'waiting' && '⏳ Matching...'}
                {gameState === 'playing' && `🏆 Room: ${gameId}`}
                {gameState === 'finished' && '✅ Game Over'}
              </div>
            </div>

            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold hover:scale-105 transition-transform shadow-xl" onClick={leaveRoom}>
              🚪 Leave Room
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg">
              <div className="p-6 items-center">
                <div className="w-full mb-6">
                  {/* Player Info */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                          <span className="text-lg font-bold">
                            {username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">You ({playerSymbol})</p>
                        <p className="text-sm text-gray-400">
                          {currentPlayer === playerSymbol
                            ? '🎯 Your Turn'
                            : "⏳ Opponent's Turn"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-bold text-white">
                          {opponent} ({currentPlayer === 'X' ? 'O' : 'X'})
                        </p>
                        <p className="text-sm text-gray-400">
                          {currentPlayer !== playerSymbol
                            ? 'Opponent Turn'
                            : 'Your Turn'}
                        </p>
                      </div>
                      <div className="avatar placeholder">
                        <div className="w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                          <span className="text-lg font-bold">
                            {opponent.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Turn Indicator */}
                  <div className="bg-blue-900 border border-blue-700 rounded-lg px-4 py-3 mb-4">
                    <span className="text-white">
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
          <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-white">Game Chat</h2>
              <div className="flex-1 overflow-y-auto mb-4 space-y-2 h-64 border border-gray-600 rounded-lg p-4">
                {chatMessages.length === 0 ? (
                  <p className="text-gray-400 text-center">
                    No messages yet. Start chatting!
                  </p>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-white">{msg.user}</span>
                        <span className="text-xs text-gray-500">
                          {msg.time.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm bg-gray-700 p-2 rounded text-white">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg flex-1 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold"
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

export default MultiplayerGameRoom;


