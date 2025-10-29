import { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { checkWinner, isBoardFull, createBoard } from '../../GameLogic/enhancedGameLogic';

// Set app element for react-modal (accessibility)
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const TicTacToeBoard = forwardRef(({ 
  onMove, 
  onReset, 
  disabled, 
  currentPlayer, 
  playerSymbol, 
  resetKey, 
  player1Name = 'Player 1', 
  player2Name = 'Player 2',
  boardSize = 3 
}, ref) => {
  const [board, setBoard] = useState(createBoard(boardSize));
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boardRef = useRef(board);
  const hasShownModalRef = useRef(false);

  // Update board when boardSize changes
  useEffect(() => {
    setBoard(createBoard(boardSize));
    boardRef.current = createBoard(boardSize);
    setWinner(null);
    setWinningLine([]);
    setIsModalOpen(false);
    hasShownModalRef.current = false;
  }, [boardSize]);

  // Define resetBoard before it's used in useEffect
  const resetBoard = useCallback(() => {
    setBoard(createBoard(boardSize));
    setWinner(null);
    setWinningLine([]);
    setIsModalOpen(false);
    hasShownModalRef.current = false;
    // Call parent's reset function if provided
    if (onReset) {
      onReset();
    }
  }, [onReset, boardSize]);

  useEffect(() => {
    // Reset board when resetKey changes
    setBoard(createBoard(boardSize));
    boardRef.current = createBoard(boardSize);
    setWinner(null);
    setWinningLine([]);
    setIsModalOpen(false);
    hasShownModalRef.current = false;
  }, [resetKey, boardSize]);

  // Automatically open modal when winner is detected (only once per game)
  useEffect(() => {
    if (winner && !hasShownModalRef.current && !isModalOpen) {
      setIsModalOpen(true);
      hasShownModalRef.current = true;
    }
  }, [winner, isModalOpen]);

  const handleViewResult = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Don't reset hasShownModalRef so modal doesn't reopen
  };

  const handlePlayAgain = () => {
    setIsModalOpen(false);
    Swal.fire({
      title: '🎮 New Game!',
      text: 'Get ready to play again!',
      icon: 'success',
      confirmButtonText: 'Let\'s Play!',
      confirmButtonColor: '#22d3ee',
      timer: 1500,
      showConfirmButton: false,
    });
    setTimeout(() => {
      resetBoard();
    }, 1600);
  };

  // Expose current board to window for AI to access
  useEffect(() => {
    boardRef.current = board;
    window.tttBoard = board;
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard, boardSize);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      if (onMove) onMove(index, result.winner, newBoard);
    } else if (isBoardFull(newBoard)) {
      setWinner('Draw');
      if (onMove) onMove(index, 'Draw', newBoard);
    } else {
      if (onMove) onMove(index, null, newBoard);
    }
  };

  // Expose handleClick to parent via ref
  useImperativeHandle(ref, () => ({
    handleClick
  }));

  // Expose reset function to parent
  useEffect(() => {
    window.resetGameBoard = resetBoard;
    return () => {
      delete window.resetGameBoard;
    };
  }, [resetBoard]);

  // Calculate cell size based on board size
  const getCellSize = () => {
    if (boardSize <= 3) return 'w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-5xl';
    if (boardSize <= 4) return 'w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl';
    if (boardSize <= 5) return 'w-12 h-12 sm:w-16 sm:h-16 text-2xl sm:text-3xl';
    return 'w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl';
  };

  // Calculate grid columns based on board size
  const getGridCols = () => {
    // Use inline style for dynamic grid columns
    return { gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` };
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid gap-2 sm:gap-3 p-4 sm:p-6 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700" style={getGridCols()}>
        {board.map((cell, index) => {
          const isWinning = winningLine.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={disabled || board[index] || winner}
              className={`ttt-cell ${getCellSize()} font-bold rounded-lg transition-all shadow-lg hover:scale-105
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

      <div className="flex gap-3">
        {winner && (
          <button 
            onClick={handleViewResult}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-xl text-base sm:text-lg animate-pulse"
          >
            📊 View Result
          </button>
        )}
        <button 
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-xl text-base sm:text-lg" 
          onClick={resetBoard}
        >
          🎮 New Game
        </button>
      </div>

      {/* Result Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="Match Result"
      >
        <div className="bg-gray-900 text-white p-8 rounded-lg max-w-md w-full">
          <div className="text-center">
            {winner === 'Draw' && (
              <>
                <div className="text-6xl mb-4">🤝</div>
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">It's a Draw!</h2>
                <div className="mb-4">
                  <p className="text-lg text-gray-300">{player1Name} vs {player2Name}</p>
                  <p className="text-sm text-gray-400">Board Size: {boardSize}×{boardSize}</p>
                </div>
                <p className="text-lg text-gray-300 mb-8">No one wins this time. Try again!</p>
              </>
            )}
            {winner === playerSymbol && (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold mb-4 text-green-400">You Win!</h2>
                <div className="mb-4">
                  <p className="text-lg text-gray-300">
                    <span className="font-bold text-green-400">{winner === 'X' ? player1Name : player2Name}</span> won!
                  </p>
                  <p className="text-sm text-gray-400">{player1Name} vs {player2Name}</p>
                  <p className="text-sm text-gray-400">Board Size: {boardSize}×{boardSize}</p>
                </div>
                <p className="text-lg text-gray-300 mb-8">Congratulations! You are the winner!</p>
              </>
            )}
            {winner && winner !== 'Draw' && winner !== playerSymbol && (
              <>
                <div className="text-6xl mb-4">😢</div>
                <h2 className="text-3xl font-bold mb-4 text-red-400">You Lost!</h2>
                <div className="mb-4">
                  <p className="text-lg text-gray-300">
                    <span className="font-bold text-red-400">{winner === 'X' ? player1Name : player2Name}</span> won!
                  </p>
                  <p className="text-sm text-gray-400">{player1Name} vs {player2Name}</p>
                  <p className="text-sm text-gray-400">Board Size: {boardSize}×{boardSize}</p>
                </div>
                <p className="text-lg text-gray-300 mb-8">Better luck next time!</p>
              </>
            )}
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all"
              >
                Close
              </button>
              <button
                onClick={handlePlayAgain}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default TicTacToeBoard;
