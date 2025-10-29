// Enhanced Game Logic for Tic Tac Toe with Variable Board Sizes and Advanced AI

import { checkWinner as universalCheckWinner } from './winChecker.js';
import { createBoard as createEmptyBoard, getBoardSizeOptions as getBoardOptions } from './boardUtils.js';
import { getAdvancedAIMove } from './advancedAI.js';

/**
 * Get required winning length based on board size (Classic Rule)
 * @param {number} size - Board size
 * @returns {number} - Required length to win
 */
export const getWinningLength = (size) => {
  return size; // Classic rule: win length = board size
};

/**
 * Generate winning lines for any board size
 * @param {number} size - Board size (3x3, 4x4, 5x5, etc.)
 * @returns {Array} - Array of winning line combinations
 */
export const generateWinningLines = (size) => {
  const lines = [];
  const winLength = getWinningLength(size);
  
  // Rows
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      const line = [];
      for (let i = 0; i < winLength; i++) {
        line.push(row * size + col + i);
      }
      lines.push(line);
    }
  }
  
  // Columns
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - winLength; row++) {
      const line = [];
      for (let i = 0; i < winLength; i++) {
        line.push((row + i) * size + col);
      }
      lines.push(line);
    }
  }
  
  // Diagonals (top-left to bottom-right)
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      const line = [];
      for (let i = 0; i < winLength; i++) {
        line.push((row + i) * size + col + i);
      }
      lines.push(line);
    }
  }
  
  // Diagonals (top-right to bottom-left)
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = winLength - 1; col < size; col++) {
      const line = [];
      for (let i = 0; i < winLength; i++) {
        line.push((row + i) * size + (col - i));
      }
      lines.push(line);
    }
  }
  
  return lines;
};

/**
 * Check if there's a winner on the board for any size
 * Uses the universal checkWinner function with classic win rules
 * @param {Array} squares - The board state array
 * @returns {Object|null} - Returns {winner: 'X'|'O', line: [indices]} or null
 */
export const checkWinner = (squares) => {
  // Use universal checkWinner for the basic winner detection
  const winner = universalCheckWinner(squares);
  
  if (!winner) {
    return null;
  }
  
  // If we need to return the winning line, we can generate it
  // For now, we'll return just the winner to maintain compatibility
  return { winner: winner, line: [] };
};

/**
 * Check if the board is full
 * @param {Array} squares - The board state array
 * @returns {boolean} - True if board is full
 */
export const isBoardFull = (squares) => {
  return squares.every((cell) => cell !== null);
};

/**
 * Get empty cells from the board
 * @param {Array} board - The board state array
 * @returns {Array} - Array of indices of empty cells
 */
export const getEmptyCells = (board) => {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      emptyCells.push(i);
    }
  }
  return emptyCells;
};

/**
 * Simple AI: Get a random empty cell
 * @param {Array} board - The board state array
 * @returns {number} - Index of random empty cell, or -1 if board is full
 */
export const getRandomEmptyCell = (board) => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return -1;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

/**
 * Check if a position is a winning move
 * @param {Array} board - The board state array
 * @param {number} index - Position to check
 * @param {string} player - Player to check for
 * @param {number} size - Board size
 * @returns {boolean} - True if this move wins
 */
const isWinningMove = (board, index, player, size) => {
  const testBoard = [...board];
  testBoard[index] = player;
  const result = checkWinner(testBoard, size);
  return result && result.winner === player;
};

/**
 * Check if opponent can win on next move (blocking move)
 * @param {Array} board - The board state array
 * @param {string} player - Player to check
 * @param {string} opponent - Opponent symbol
 * @param {number} size - Board size
 * @returns {number|null} - Position to block, or null
 */
const findBlockingMove = (board, player, opponent, size) => {
  const emptyCells = getEmptyCells(board);
  
  for (const cell of emptyCells) {
    if (isWinningMove(board, cell, opponent, size)) {
      return cell;
    }
  }
  
  return null;
};

/**
 * Find best strategic positions
 * @param {Array} board - The board state array
 * @param {number} size - Board size
 * @returns {number[]} - Array of good positions
 */
const findStrategicPositions = (board, size) => {
  const emptyCells = getEmptyCells(board);
  const goodPositions = [];
  
  // Prefer center positions
  const center = Math.floor(size / 2);
  const centerIndex = center * size + center;
  if (emptyCells.includes(centerIndex)) {
    goodPositions.push(centerIndex);
  }
  
  // Prefer corner positions
  const corners = [
    0, size - 1,
    size * (size - 1),
    size * (size - 1) + (size - 1)
  ];
  
  for (const corner of corners) {
    if (emptyCells.includes(corner)) {
      goodPositions.push(corner);
    }
  }
  
  // Prefer edge positions
  for (let i = 0; i < size; i++) {
    // Top edge
    if (emptyCells.includes(i)) goodPositions.push(i);
    // Bottom edge
    if (emptyCells.includes((size - 1) * size + i)) goodPositions.push((size - 1) * size + i);
    // Left edge
    if (emptyCells.includes(i * size)) goodPositions.push(i * size);
    // Right edge
    if (emptyCells.includes(i * size + size - 1)) goodPositions.push(i * size + size - 1);
  }
  
  return goodPositions;
};

/**
 * Advanced AI Strategy
 * Uses different strategies based on board size for optimal performance
 * @param {Array} board - The board state array
 * @param {string} aiPlayer - AI player symbol
 * @param {string} humanPlayer - Human player symbol
 * @param {number} size - Board size
 * @returns {number} - Best move index
 */
export const getAIMove = (board, aiPlayer = 'O', humanPlayer = 'X', size = 3) => {
  const emptyCells = getEmptyCells(board);
  
  if (emptyCells.length === 0) return -1;
  
  // Use advanced AI for larger boards (5x5 and 6x6)
  if (size >= 5) {
    return getAdvancedAIMove(board, aiPlayer, humanPlayer, size);
  }
  
  // Use original strategy for smaller boards (3x3 and 4x4)
  // 1. Try to win immediately
  for (const cell of emptyCells) {
    if (isWinningMove(board, cell, aiPlayer, size)) {
      console.log('AI found winning move at:', cell);
      return cell;
    }
  }
  
  // 2. Block opponent from winning
  const block = findBlockingMove(board, aiPlayer, humanPlayer, size);
  if (block !== null) {
    console.log('AI blocking at:', block);
    return block;
  }
  
  // 3. Use minimax for smaller boards (3x3 and 4x4)
  if (size <= 4 && size >= 3 && emptyCells.length <= 9) {
    try {
      const result = minimax(board, aiPlayer, aiPlayer, humanPlayer, size, 0);
      if (result && result.move !== null && result.move !== undefined) {
        console.log('AI using minimax move:', result.move);
        return result.move;
      }
    } catch (error) {
      console.error('Minimax error:', error);
    }
  }
  
  // 4. Find strategic positions
  const strategic = findStrategicPositions(board, size);
  if (strategic.length > 0) {
    const move = strategic[Math.floor(Math.random() * strategic.length)];
    console.log('AI using strategic move:', move);
    return move;
  }
  
  // 5. Random move as fallback
  const randomMove = getRandomEmptyCell(board);
  console.log('AI using random move:', randomMove);
  return randomMove;
};

/**
 * Minimax algorithm for optimal AI
 * @param {Array} board - The board state array
 * @param {string} player - Current player
 * @param {string} aiPlayer - AI player symbol
 * @param {string} humanPlayer - Human player symbol
 * @param {number} size - Board size
 * @param {number} depth - Current depth (for optimization)
 * @returns {Object} - Best move with score
 */
const minimax = (board, player, aiPlayer, humanPlayer, size = 3, depth = 0) => {
  const emptyCells = getEmptyCells(board);
  const maxDepth = size > 3 ? 4 : 8; // Limit depth for performance
  
  // Base cases
  const winner = checkWinner(board, size);
  if (winner) {
    return {
      score: winner.winner === aiPlayer ? 100 - depth : depth - 100,
      move: null
    };
  }
  
  if (emptyCells.length === 0 || depth >= maxDepth) {
    return { score: 0, move: null };
  }
  
  const moves = [];
  
  for (let i = 0; i < emptyCells.length; i++) {
    const move = emptyCells[i];
    const newBoard = [...board];
    newBoard[move] = player;
    
    const result = minimax(
      newBoard,
      player === aiPlayer ? humanPlayer : aiPlayer,
      aiPlayer,
      humanPlayer,
      size,
      depth + 1
    );
    
    moves.push({
      move: move,
      score: result.score
    });
  }
  
  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  
  return moves[bestMove];
};

/**
 * Make a move on the board
 * @param {Array} board - The board state array
 * @param {number} index - The cell index to make a move
 * @param {string} player - The player ('X' or 'O')
 * @param {number} size - Board size
 * @returns {Object} - Returns {newBoard: [...], status: string, winner: string|null}
 */
export const makeMove = (board, index, player, size = 3) => {
  const newBoard = [...board];
  newBoard[index] = player;

  const result = checkWinner(newBoard, size);
  const status = result ? 'win' : isBoardFull(newBoard) ? 'draw' : 'playing';

  return {
    newBoard,
    status,
    winner: result ? result.winner : null,
    winningLine: result ? result.line : [],
  };
};

/**
 * Validate a move
 * @param {Array} board - The board state array
 * @param {number} index - The cell index to validate
 * @returns {boolean} - True if move is valid
 */
export const isValidMove = (board, index) => {
  return index >= 0 && index < board.length && board[index] === null;
};

/**
 * Get game status
 * @param {Array} squares - The board state array
 * @param {number} size - Board size
 * @returns {string|null} - Returns 'win', 'draw', or null
 */
export const getGameStatus = (squares, size = 3) => {
  const result = checkWinner(squares, size);
  if (result) {
    return 'win';
  } else if (isBoardFull(squares)) {
    return 'draw';
  }
  return null;
};

/**
 * Create initial board for given size
 * @param {number} size - Board size
 * @returns {Array} - Initial board array
 */
export const createBoard = (size) => {
  return createEmptyBoard(size);
};

/**
 * Get board size options
 * @returns {Array} - Array of board size options
 */
export const getBoardSizeOptions = () => {
  return getBoardOptions();
};

/**
 * Get required win length for display
 * @param {number} size - Board size
 * @returns {string} - Display text for win requirement
 */
export const getWinRequirement = (size) => {
  const length = getWinningLength(size);
  return `Get ${length} in a row to win!`;
};