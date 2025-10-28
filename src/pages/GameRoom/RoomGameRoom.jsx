import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicTacToeBoard from './TicTacToeBoard';
import { useAuth } from '../../context/AuthContext';

const RoomGameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user?.displayName || 'Player';

  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState('playing');
  const [playerSymbol] = useState('X');

  const handleMove = (index, result, board) => {
    if (result) {
      setGameState('finished');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const leaveRoom = () => {
    if (window.confirm('Leave this room?')) navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-2xl mb-6 text-white border border-gray-700 rounded-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-white">🧩 Room Game</h1>
              <div className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-semibold">{`Room: ${gameId}`}</div>
            </div>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold hover:scale-105 transition-transform shadow-xl" onClick={leaveRoom}>
              🚪 Leave Room
            </button>
          </div>
        </div>

        <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg">
          <div className="p-6 items-center">
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-6">
                <p className="font-bold text-lg text-white">You ({playerSymbol})</p>
                <p className="text-sm text-gray-400">{`Player: ${username}`}</p>
              </div>

              <div className="bg-blue-900 border border-blue-700 rounded-lg px-4 py-3 mb-4">
                <span className="text-white">
                  {currentPlayer === playerSymbol ? '🎯 Your turn to play!' : "⏳ Opponent's turn"}
                </span>
              </div>

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
    </div>
  );
};

export default RoomGameRoom;


