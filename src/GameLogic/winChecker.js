/**
 * Universal Win Checker for Tic Tac Toe
 * Supports 3×3, 4×4, 5×5, and 6×6 boards with classic win rules
 * 
 * Classic Rules:
 * - 3×3 → 3 in a row
 * - 4×4 → 4 in a row  
 * - 5×5 → 5 in a row
 * - 6×6 → 6 in a row
 */

/**
 * Get the required win length based on board size
 * @param {number} boardSize - The size of the board (3, 4, 5, or 6)
 * @returns {number} - Required consecutive pieces to win
 */
export const getWinLength = (boardSize) => {
  return boardSize; // Classic rule: win length = board size
};

/**
 * Detect board size from the board array
 * @param {Array} board - The board state array
 * @returns {number} - Detected board size
 */
export const detectBoardSize = (board) => {
  const totalCells = board.length;
  const size = Math.sqrt(totalCells);
  
  // Validate that it's a perfect square and within our supported range
  if (Number.isInteger(size) && size >= 3 && size <= 6) {
    return size;
  }
  
  throw new Error(`Invalid board size. Expected 3×3, 4×4, 5×5, or 6×6, got ${totalCells} cells`);
};

/**
 * Check if a sequence of cells contains a winning combination
 * @param {Array} board - The board state array
 * @param {Array} indices - Array of cell indices to check
 * @returns {string|null} - Winner symbol ('X' or 'O') or null
 */
const checkSequence = (board, indices) => {
  const firstCell = board[indices[0]];
  
  // If first cell is empty, no winner
  if (!firstCell) return null;
  
  // Check if all cells in sequence have the same value
  for (let i = 1; i < indices.length; i++) {
    if (board[indices[i]] !== firstCell) {
      return null;
    }
  }
  
  return firstCell;
};

/**
 * Get all possible winning sequences for a board
 * @param {number} boardSize - The size of the board
 * @returns {Array} - Array of winning sequences (each sequence is an array of indices)
 */
const getWinningSequences = (boardSize) => {
  const sequences = [];
  const winLength = getWinLength(boardSize);
  
  // Check rows
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      const sequence = [];
      for (let i = 0; i < winLength; i++) {
        sequence.push(row * boardSize + col + i);
      }
      sequences.push(sequence);
    }
  }
  
  // Check columns
  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row <= boardSize - winLength; row++) {
      const sequence = [];
      for (let i = 0; i < winLength; i++) {
        sequence.push((row + i) * boardSize + col);
      }
      sequences.push(sequence);
    }
  }
  
  // Check main diagonal (top-left to bottom-right)
  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      const sequence = [];
      for (let i = 0; i < winLength; i++) {
        sequence.push((row + i) * boardSize + col + i);
      }
      sequences.push(sequence);
    }
  }
  
  // Check anti-diagonal (top-right to bottom-left)
  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = winLength - 1; col < boardSize; col++) {
      const sequence = [];
      for (let i = 0; i < winLength; i++) {
        sequence.push((row + i) * boardSize + (col - i));
      }
      sequences.push(sequence);
    }
  }
  
  return sequences;
};

/**
 * Universal checkWinner function
 * Works dynamically for 3×3, 4×4, 5×5, and 6×6 boards
 * 
 * @param {Array} board - The board state array
 * @returns {string|null} - 'X' or 'O' if there's a winner, null if no winner yet
 * 
 * @example
 * const board = [
 *   ['X', 'X', 'X'],
 *   [null, 'O', null],
 *   ['O', null, 'O']
 * ];
 * console.log(checkWinner(board)); // Output: 'X'
 */
export const checkWinner = (board) => {
  // Validate input
  if (!Array.isArray(board)) {
    throw new Error('Board must be an array');
  }
  
  if (board.length === 0) {
    throw new Error('Board cannot be empty');
  }
  
  // Detect board size
  const boardSize = detectBoardSize(board);
  
  // Get all possible winning sequences
  const sequences = getWinningSequences(boardSize);
  
  // Check each sequence for a winner
  for (const sequence of sequences) {
    const winner = checkSequence(board, sequence);
    if (winner) {
      return winner;
    }
  }
  
  // No winner found
  return null;
};

/**
 * Check if the board is full (no more moves possible)
 * @param {Array} board - The board state array
 * @returns {boolean} - True if board is full
 */
export const isBoardFull = (board) => {
  return board.every(cell => cell !== null && cell !== undefined);
};

/**
 * Get game status
 * @param {Array} board - The board state array
 * @returns {string} - 'win', 'draw', or 'playing'
 */
export const getGameStatus = (board) => {
  const winner = checkWinner(board);
  if (winner) {
    return 'win';
  } else if (isBoardFull(board)) {
    return 'draw';
  } else {
    return 'playing';
  }
};

/**
 * Get empty cell indices
 * @param {Array} board - The board state array
 * @returns {Array} - Array of indices of empty cells
 */
export const getEmptyCells = (board) => {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null || board[i] === undefined) {
      emptyCells.push(i);
    }
  }
  return emptyCells;
};

/**
 * Validate if a move is legal
 * @param {Array} board - The board state array
 * @param {number} index - The cell index to check
 * @returns {boolean} - True if move is valid
 */
export const isValidMove = (board, index) => {
  return index >= 0 && 
         index < board.length && 
         (board[index] === null || board[index] === undefined);
};
