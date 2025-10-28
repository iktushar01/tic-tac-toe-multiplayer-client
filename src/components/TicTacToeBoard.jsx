import { useState, useEffect } from 'react';

const TicTacToeBoard = ({ onMove, disabled, currentPlayer, playerSymbol }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  useEffect(() => {
    // Reset board when needed
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
  }, [currentPlayer]);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (disabled || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      if (onMove) onMove(index, result.winner);
    } else if (newBoard.every((cell) => cell !== null)) {
      setWinner('Draw');
      if (onMove) onMove(index, 'Draw');
    } else {
      if (onMove) onMove(index, null);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-3 gap-3 p-6 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
        {board.map((cell, index) => {
          const isWinning = winningLine.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={disabled || board[index] || winner}
              className={`w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-5xl font-bold rounded-xl transition-all shadow-lg hover:scale-105
                ${cell === 'X'
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/50'
                  : cell === 'O'
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/50'
                  : 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                }
                ${isWinning ? 'ring-4 ring-yellow-400 scale-110 animate-pulse' : ''}
                ${!board[index] && !winner ? 'hover:shadow-xl cursor-pointer' : ''}
                ${disabled || winner ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {winner && (
        <div className={`px-8 py-4 rounded-lg shadow-lg animate-bounce ${
          winner === playerSymbol 
            ? 'bg-green-900 border border-green-700 text-green-200' 
            : winner === 'Draw' 
            ? 'bg-yellow-900 border border-yellow-700 text-yellow-200' 
            : 'bg-red-900 border border-red-700 text-red-200'
        }`}>
          <span className="text-2xl font-bold">
            {winner === 'Draw'
              ? '🤝 It\'s a Draw!'
              : winner === playerSymbol
              ? '🎉 You Win!'
              : '😢 You Lost!'}
          </span>
        </div>
      )}

      <div className="flex gap-3">
        <button 
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-xl text-base sm:text-lg" 
          onClick={resetBoard}
        >
          🎮 New Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToeBoard;
