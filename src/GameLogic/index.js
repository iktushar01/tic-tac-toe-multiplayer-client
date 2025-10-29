/**
 * Game Logic Index
 * Central export point for all game logic functions
 */

// Win checking functions
export { 
  checkWinner, 
  getGameStatus, 
  isBoardFull, 
  getEmptyCells, 
  isValidMove,
  detectBoardSize,
  getWinLength 
} from './winChecker.js';

// Board utility functions
export { 
  createBoard, 
  getBoardSizeOptions, 
  indexToCoordinates, 
  coordinatesToIndex,
  getCornerPositions,
  getCenterPosition,
  getEdgePositions,
  getStrategicPositions,
  makeMove,
  resetBoard,
  getBoardStats,
  displayBoard
} from './boardUtils.js';

// Enhanced game logic (AI and advanced features)
export { 
  getWinningLength,
  generateWinningLines,
  getRandomEmptyCell,
  getAIMove,
  makeMove as makeGameMove,
  getGameStatus as getAdvancedGameStatus,
  getWinRequirement
} from './enhancedGameLogic.js';

// Advanced AI for large boards
export { 
  getAdvancedAIMove,
  isForkMove,
  findForkMoves
} from './advancedAI.js';