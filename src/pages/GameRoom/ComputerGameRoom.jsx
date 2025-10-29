import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import EnhancedTicTacToeBoard from './EnhancedTicTacToeBoard';
import { getAIMove, getRandomEmptyCell, createBoard, getBoardSizeOptions, getWinRequirement } from '../../GameLogic/enhancedGameLogic';
import { apiService } from '../../services/api';
import { 
  IoArrowBack, 
  IoRefresh, 
  IoTrophy, 
  IoCheckmark,
  IoGrid,
  IoSparkles,
  IoRocket
} from 'react-icons/io5';
import { 
  FaRobot, 
  FaUser, 
  FaDice, 
  FaBrain, 
  FaFire 
} from 'react-icons/fa';

const ComputerGameRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState('playing');
  const [playerSymbol] = useState('X');
  const [boardSize, setBoardSize] = useState(3);
  const [aiDifficulty, setAiDifficulty] = useState('medium');
  const [showBoardSelector, setShowBoardSelector] = useState(true);
  const boardRef = useRef(createBoard(boardSize));
  const [resetKey, setResetKey] = useState(0);
  const aiMovePendingRef = useRef(false);
  const boardInstanceRef = useRef(null);
  const [player1Name] = useState('You');
  const [player2Name] = useState('Computer');
  const [totalMoves, setTotalMoves] = useState(0);
  const [gameSaved, setGameSaved] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(null);

  const boardSizeOptions = getBoardSizeOptions();

  // Update boardRef when boardSize changes
  useEffect(() => {
    boardRef.current = createBoard(boardSize);
  }, [boardSize]);

  const handleMove = async (index, result, board) => {
    console.log('Move made:', { index, result, board, currentPlayer });
    boardRef.current = board;
    setTotalMoves(prev => prev + 1);
    
    // Save move to server if game is active
    if (currentGameId && gameState === 'playing') {
      try {
        await apiService.makeComputerGameMove(currentGameId, index, currentPlayer);
      } catch (error) {
        console.error('Failed to save move:', error);
      }
    }
    
    if (result) {
      setGameState('finished');
      // Save game result to database
      await saveGameResult(result, board);
    } else {
      // Switch turn
      setCurrentPlayer(prev => prev === 'X' ? 'O' : 'X');
    }
  };

  const saveGameResult = async (result, finalBoard) => {
    if (gameSaved || !user) return;
    setGameSaved(true);

    try {
      let gameResult;
      let winner = null;
      
      if (result === 'Draw') {
        gameResult = 'draw';
        winner = 'draw';
      } else if (result === playerSymbol) {
        gameResult = 'win';
        winner = playerSymbol;
      } else {
        gameResult = 'loss';
        winner = playerSymbol === 'X' ? 'O' : 'X';
      }

      // Complete the game in the database
      if (currentGameId) {
        await apiService.completeComputerGame(
          currentGameId,
          gameResult,
          winner,
          finalBoard || boardRef.current
        );
        console.log('Game completed successfully with ID:', currentGameId);
      } else {
        // Fallback to legacy method if no game ID
        await apiService.saveGameResult(
          gameResult, 
          'Computer', 
          totalMoves + 1, 
          `computer-${boardSize}x${boardSize}-${aiDifficulty}`
        );
        console.log('Game result saved using legacy method');
      }
      
    } catch (error) {
      console.error('Failed to save game result:', error);
    }
  };

  const resetGame = () => {
    setCurrentPlayer('X');
    setGameState('playing');
    boardRef.current = createBoard(boardSize);
    setResetKey(prev => prev + 1);
    aiMovePendingRef.current = false;
    setTotalMoves(0);
    setGameSaved(false);
    setCurrentGameId(null);
  };

  const handleBoardSizeChange = async (size) => {
    setBoardSize(size);
    setShowBoardSelector(false);
    boardRef.current = createBoard(size);
    resetGame();
    
    // Create new game in database
    await createNewGame(size, aiDifficulty);
  };

  const handleDifficultyChange = (difficulty) => {
    setAiDifficulty(difficulty);
  };

  const createNewGame = async (boardSize, difficulty) => {
    if (!user) return;
    
    try {
      const response = await apiService.createComputerGame(boardSize, difficulty, playerSymbol);
      setCurrentGameId(response.gameId);
      console.log('New game created with ID:', response.gameId);
    } catch (error) {
      console.error('Failed to create new game:', error);
    }
  };

  const startNewGame = () => {
    setShowBoardSelector(true);
    setGameState('playing');
    setCurrentPlayer('X');
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
      const currentBoard = boardRef.current || createBoard(boardSize);
      console.log('Current board:', currentBoard);
      
      let aiMove;
      
      // Choose AI strategy based on difficulty
      if (aiDifficulty === 'easy' || boardSize > 4) {
        // Simple random move for easy difficulty or large boards
        aiMove = getRandomEmptyCell(currentBoard);
      } else {
        // Use minimax for medium/hard difficulty on smaller boards
        aiMove = getAIMove(currentBoard, 'O', 'X', boardSize);
      }
      
      console.log('AI move index:', aiMove);
      
      if (aiMove !== -1 && boardInstanceRef.current) {
        // Call the handleClick function directly from the board instance
        boardInstanceRef.current.handleClick(aiMove);
      }
      aiMovePendingRef.current = false;
    }, aiDifficulty === 'easy' ? 500 : 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentPlayer, gameState, boardSize, aiDifficulty]);

  const leaveRoom = () => {
    navigate('/');
  };

  if (showBoardSelector) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 shadow-2xl mb-8 text-white border border-purple-500 rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaRobot className="text-5xl" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      Computer Mode
                      <IoSparkles className="text-yellow-300" />
                    </h1>
                    <p className="text-purple-200 text-sm">Challenge the AI</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2" 
                  onClick={leaveRoom}
                >
                  <IoArrowBack className="text-xl" />
                  Back
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 shadow-2xl border border-gray-700 rounded-xl p-8"
          >
            {/* Title Section */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-4"
              >
                <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full">
                  <IoGrid className="text-5xl text-white" />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Choose Your Challenge
              </h2>
              <p className="text-gray-400 text-lg">Select board size and AI difficulty to begin</p>
            </div>

            {/* Board Size Selection */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <IoGrid className="text-2xl text-cyan-400" />
                <h3 className="text-2xl font-semibold text-white">Board Size</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {boardSizeOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBoardSizeChange(option.value)}
                    className={`p-6 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-cyan-600 hover:to-blue-700 border-2 rounded-xl transition-all shadow-lg ${
                      boardSize === option.value 
                        ? 'border-cyan-400 ring-4 ring-cyan-400/30' 
                        : 'border-gray-600 hover:border-cyan-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">
                      {option.value === 3 ? '🟦' : option.value === 4 ? '🟩' : option.value === 5 ? '🟨' : '🟧'}
                    </div>
                    <div className="text-white font-bold text-xl mb-1">{option.label}</div>
                    <div className="text-gray-400 text-sm">{option.difficulty}</div>
                    <div className="text-cyan-400 text-xs mt-2 font-semibold">
                      {option.winLength} in a row
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* AI Difficulty Selection */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <FaBrain className="text-2xl text-purple-400" />
                <h3 className="text-2xl font-semibold text-white">AI Difficulty</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'easy', label: 'Easy', description: 'Random moves', icon: FaDice, color: 'green', gradient: 'from-green-500 to-emerald-600' },
                  { value: 'medium', label: 'Medium', description: 'Smart AI', icon: FaBrain, color: 'yellow', gradient: 'from-yellow-500 to-orange-600' },
                  { value: 'hard', label: 'Hard', description: 'Expert AI', icon: FaFire, color: 'red', gradient: 'from-red-500 to-pink-600' }
                ].map((difficulty, index) => {
                  const Icon = difficulty.icon;
                  return (
                    <motion.button
                      key={difficulty.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDifficultyChange(difficulty.value)}
                      className={`p-6 border-2 rounded-xl transition-all shadow-lg relative overflow-hidden ${
                        aiDifficulty === difficulty.value
                          ? `bg-gradient-to-br ${difficulty.gradient} border-white ring-4 ring-${difficulty.color}-400/30`
                          : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`p-3 rounded-lg ${
                          aiDifficulty === difficulty.value 
                            ? 'bg-white/20' 
                            : 'bg-gray-600'
                        }`}>
                          <Icon className="text-3xl text-white" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="text-white font-bold text-xl mb-1">{difficulty.label}</div>
                          <div className={`text-sm ${
                            aiDifficulty === difficulty.value ? 'text-white/80' : 'text-gray-400'
                          }`}>
                            {difficulty.description}
                          </div>
                        </div>
                        {aiDifficulty === difficulty.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-white text-2xl"
                          >
                            <IoCheckmark />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Game Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <IoRocket className="text-2xl text-yellow-400" />
                <h4 className="text-xl font-semibold text-white">Game Rules</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaUser className="text-cyan-400" />
                    <span>You play as <span className="font-bold text-cyan-400">X</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaRobot className="text-purple-400" />
                    <span>Computer plays as <span className="font-bold text-purple-400">O</span></span>
                  </div>
                </div>
                <div className="space-y-3">
                  {boardSizeOptions.map((option) => (
                    <div key={option.value} className="flex items-center gap-3 text-gray-300 text-sm">
                      <IoTrophy className="text-yellow-400" />
                      <span><span className="font-bold">{option.label}</span>: Get {option.winLength} in a row</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 shadow-2xl mb-6 text-white border border-purple-500 rounded-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 bg-white/20 rounded-lg"
                >
                  <FaRobot className="text-4xl" />
                </motion.div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    Computer Mode
                    <IoSparkles className="text-yellow-300" />
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-3 py-1 bg-purple-700 rounded-full text-xs font-semibold flex items-center gap-1">
                      <IoGrid className="text-sm" />
                      {boardSize}×{boardSize} Board
                    </span>
                    <span className="px-3 py-1 bg-pink-700 rounded-full text-xs font-semibold flex items-center gap-1">
                      <FaBrain className="text-sm" />
                      {aiDifficulty.charAt(0).toUpperCase() + aiDifficulty.slice(1)} AI
                    </span>
                    <span className="px-3 py-1 bg-purple-800 rounded-full text-xs font-semibold flex items-center gap-1">
                      <IoTrophy className="text-sm" />
                      {getWinRequirement(boardSize)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold shadow-lg flex items-center gap-2" 
                  onClick={startNewGame}
                >
                  <IoRefresh className="text-xl" />
                  New Game
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2" 
                  onClick={leaveRoom}
                >
                  <IoArrowBack className="text-xl" />
                  Leave
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 shadow-2xl border border-gray-700 rounded-xl"
        >
          <div className="p-6">
            {/* Game Status */}
            <motion.div 
              className={`
                rounded-xl px-6 py-4 mb-6 transition-all duration-300 shadow-lg relative overflow-hidden
                ${gameState === 'finished' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-purple-400'
                  : currentPlayer === playerSymbol 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-2 border-cyan-300'
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-gray-500'
                }
              `}
              animate={gameState === 'finished' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5, repeat: gameState === 'finished' ? Infinity : 0 }}
            >
              <div className="flex items-center justify-center gap-3 relative z-10">
                {gameState === 'finished' && (
                  <>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <IoTrophy className="text-4xl text-yellow-300" />
                    </motion.div>
                    <span className="text-white text-xl md:text-2xl font-bold">
                      Match Finished!
                    </span>
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <IoTrophy className="text-4xl text-yellow-300" />
                    </motion.div>
                  </>
                )}
                {gameState === 'playing' && currentPlayer === playerSymbol && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <FaUser className="text-3xl text-cyan-300" />
                    </motion.div>
                    <span className="text-white text-lg font-semibold">
                      Your turn to play!
                    </span>
                  </>
                )}
                {gameState === 'playing' && currentPlayer !== playerSymbol && (
                  <>
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaRobot className="text-3xl text-purple-300" />
                    </motion.div>
                    <span className="text-white text-lg font-semibold">
                      AI is thinking...
                    </span>
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FaBrain className="text-2xl text-purple-300" />
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Game Board */}
            <div className="flex justify-center">
              <EnhancedTicTacToeBoard
                ref={boardInstanceRef}
                key={`${boardSize}-${resetKey}`}
                onMove={handleMove}
                onReset={resetGame}
                disabled={currentPlayer !== playerSymbol || gameState !== 'playing'}
                currentPlayer={currentPlayer}
                playerSymbol={playerSymbol}
                resetKey={resetKey}
                player1Name={player1Name}
                player2Name={player2Name}
                boardSize={boardSize}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComputerGameRoom;