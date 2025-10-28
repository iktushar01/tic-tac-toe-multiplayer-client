import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TicTacToeBoard from './TicTacToeBoard';
import { getRandomEmptyCell } from '../../GameLogic/gameLogic';

const ComputerGameRoom = () => {
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState('playing');
  const [playerSymbol] = useState('X');
  const boardRef = useRef(Array(9).fill(null));
  const [resetKey, setResetKey] = useState(0);
  const aiMovePendingRef = useRef(false);
  const boardInstanceRef = useRef(null);
  const [player1Name] = useState('You');
  const [player2Name] = useState('Computer');

  const handleMove = (index, result, board) => {
    console.log('Move made:', { index, result, board, currentPlayer });
    boardRef.current = board;
    
    if (result) {
      setGameState('finished');
    } else {
      // Switch turn
      setCurrentPlayer(prev => prev === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setCurrentPlayer('X');
    setGameState('playing');
    boardRef.current = Array(9).fill(null);
    setResetKey(prev => prev + 1);
    aiMovePendingRef.current = false;
  };

  // Handle AI move
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (currentPlayer !== 'O') return;
    if (aiMovePendingRef.current) return;

    aiMovePendingRef.current = true;
    console.log('AI turn!');

    const timer = setTimeout(() => {
      const currentBoard = boardRef.current || Array(9).fill(null);
      console.log('Current board:', currentBoard);
      
      const aiMove = getRandomEmptyCell(currentBoard);
      console.log('AI move index:', aiMove);
      
      if (aiMove !== -1 && boardInstanceRef.current) {
        // Call the handleClick function directly from the board instance
        boardInstanceRef.current.handleClick(aiMove);
      }
      aiMovePendingRef.current = false;
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentPlayer, gameState]);

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
                Game Mode: AI
              </div>
            </div>
            <button 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold hover:scale-105 transition-transform shadow-xl" 
              onClick={leaveRoom}
            >
              🚪 Leave
            </button>
          </div>
        </div>

        <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg">
          <div className="p-6 items-center">
            <div className="w-full mb-6">
              <div className={`
                rounded-xl px-6 py-4 mb-4 transition-all duration-300 shadow-lg
                ${gameState === 'finished' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-purple-400 animate-pulse'
                  : currentPlayer === playerSymbol 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-2 border-cyan-300'
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-gray-500'
                }
              `}>
                <div className="flex items-center justify-center gap-3">
                  {gameState === 'finished' && (
                    <>
                      <div className="text-3xl animate-bounce">🎮</div>
                      <span className="text-white text-xl font-bold">
                        Match Finished!
                      </span>
                    </>
                  )}
                  {gameState === 'playing' && currentPlayer === playerSymbol && (
                    <>
                      <div className="text-3xl animate-pulse">🎯</div>
                      <span className="text-white text-lg font-semibold">
                        Your turn to play!
                      </span>
                    </>
                  )}
                  {gameState === 'playing' && currentPlayer !== playerSymbol && (
                    <>
                      <div className="text-3xl animate-pulse">🤖</div>
                      <span className="text-white text-lg font-semibold">
                        AI is thinking...
                      </span>
                    </>
                  )}
                </div>
              </div>

              <TicTacToeBoard
                ref={boardInstanceRef}
                key={resetKey}
                onMove={handleMove}
                onReset={resetGame}
                disabled={currentPlayer !== playerSymbol || gameState !== 'playing'}
                currentPlayer={currentPlayer}
                playerSymbol={playerSymbol}
                resetKey={resetKey}
                player1Name={player1Name}
                player2Name={player2Name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerGameRoom;
