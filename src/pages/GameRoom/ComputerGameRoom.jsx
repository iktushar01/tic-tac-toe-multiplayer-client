import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TicTacToeBoard from './TicTacToeBoard';

// Naive AI: pick first empty cell
function computeAIMove(board) {
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] === null) return i;
  }
  return -1;
}

const ComputerGameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState('playing');
  const [playerSymbol] = useState('X');
  const [lastBoard, setLastBoard] = useState(Array(9).fill(null));

  // When it's AI's turn, make a move
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (currentPlayer !== 'O') return;

    const index = computeAIMove(lastBoard);
    if (index >= 0) {
      const event = new CustomEvent('tictactoe-ai-move', {
        detail: { index },
      });
      window.dispatchEvent(event);
    }
  }, [currentPlayer, gameState, lastBoard]);

  const handleMove = (index, result) => {
    // Track last board via synthetic events raised by board component
    if (result) {
      setGameState('finished');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Listen to board state snapshots
  useEffect(() => {
    const onSnapshot = (e) => setLastBoard(e.detail.board);
    window.addEventListener('tictactoe-board-snapshot', onSnapshot);
    return () => window.removeEventListener('tictactoe-board-snapshot', onSnapshot);
  }, []);

  const leaveRoom = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl mb-6 text-white border border-gray-700 rounded-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-white">🤖 Computer Mode</h1>
              <div className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-semibold">
                {`Game: ${gameId || 'Local'}`}
              </div>
            </div>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold hover:scale-105 transition-transform shadow-xl" onClick={leaveRoom}>
              🚪 Leave
            </button>
          </div>
        </div>

        <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg">
          <div className="p-6 items-center">
            <div className="w-full mb-6">
              <div className="bg-blue-900 border border-blue-700 rounded-lg px-4 py-3 mb-4">
                <span className="text-white">
                  {currentPlayer === playerSymbol ? '🎯 Your turn to play!' : '🤖 AI thinking...'}
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

export default ComputerGameRoom;


