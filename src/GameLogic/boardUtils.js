/**
 * Board Utilities for Tic Tac Toe
 * Helper functions for board creation, manipulation, and validation
 */

/**
 * Create an empty board for the given size
 * @param {number} size - Board size (3, 4, 5, or 6)
 * @returns {Array} - Empty board array filled with null values
 */
export const createBoard = (size) => {
  if (size < 3 || size > 6) {
    throw new Error('Board size must be between 3 and 6');
  }
  return Array(size * size).fill(null);
};

/**
 * Get board size options with metadata
 * @returns {Array} - Array of board size options with labels and difficulty
 */
export const getBoardSizeOptions = () => {
  return [
    { 
      value: 3, 
      label: '3×3 (Classic)', 
      difficulty: 'Easy', 
      winLength: 3,
      description: 'Classic tic-tac-toe with 3 in a row to win'
    },
    { 
      value: 4, 
      label: '4×4 (Medium)', 
      difficulty: 'Medium', 
      winLength: 4,
      description: 'Medium difficulty with 4 in a row to win'
    },
    { 
      value: 5, 
      label: '5×5 (Hard)', 
      difficulty: 'Hard', 
      winLength: 5,
      description: 'Hard difficulty with 5 in a row to win'
    },
    { 
      value: 6, 
      label: '6×6 (Expert)', 
      difficulty: 'Expert', 
      winLength: 6,
      description: 'Expert difficulty with 6 in a row to win'
    }
  ];
};

/**
 * Convert 1D board index to 2D coordinates
 * @param {number} index - 1D array index
 * @param {number} boardSize - Size of the board
 * @returns {Object} - {row, col} coordinates
 */
export const indexToCoordinates = (index, boardSize) => {
  return {
    row: Math.floor(index / boardSize),
    col: index % boardSize
  };
};

/**
 * Convert 2D coordinates to 1D board index
 * @param {number} row - Row coordinate
 * @param {number} col - Column coordinate
 * @param {number} boardSize - Size of the board
 * @returns {number} - 1D array index
 */
export const coordinatesToIndex = (row, col, boardSize) => {
  return row * boardSize + col;
};

/**
 * Get all corner positions for a board
 * @param {number} boardSize - Size of the board
 * @returns {Array} - Array of corner indices
 */
export const getCornerPositions = (boardSize) => {
  return [
    0, // Top-left
    boardSize - 1, // Top-right
    boardSize * (boardSize - 1), // Bottom-left
    boardSize * (boardSize - 1) + (boardSize - 1) // Bottom-right
  ];
};

/**
 * Get center position for a board
 * @param {number} boardSize - Size of the board
 * @returns {number|null} - Center index or null if no center exists
 */
export const getCenterPosition = (boardSize) => {
  if (boardSize % 2 === 1) {
    // Odd-sized boards have a center
    const center = Math.floor(boardSize / 2);
    return center * boardSize + center;
  }
  return null; // Even-sized boards don't have a single center
};

/**
 * Get edge positions for a board
 * @param {number} boardSize - Size of the board
 * @returns {Array} - Array of edge indices
 */
export const getEdgePositions = (boardSize) => {
  const edges = [];
  
  // Top edge
  for (let col = 0; col < boardSize; col++) {
    edges.push(col);
  }
  
  // Bottom edge
  for (let col = 0; col < boardSize; col++) {
    edges.push((boardSize - 1) * boardSize + col);
  }
  
  // Left edge
  for (let row = 1; row < boardSize - 1; row++) {
    edges.push(row * boardSize);
  }
  
  // Right edge
  for (let row = 1; row < boardSize - 1; row++) {
    edges.push(row * boardSize + boardSize - 1);
  }
  
  return edges;
};

/**
 * Get strategic positions (center, corners, edges) in order of preference
 * @param {Array} board - The board state array
 * @param {number} boardSize - Size of the board
 * @returns {Array} - Array of strategic positions ordered by preference
 */
export const getStrategicPositions = (board, boardSize) => {
  const positions = [];
  
  // 1. Center (highest priority)
  const center = getCenterPosition(boardSize);
  if (center !== null && board[center] === null) {
    positions.push(center);
  }
  
  // 2. Corners
  const corners = getCornerPositions(boardSize);
  for (const corner of corners) {
    if (board[corner] === null) {
      positions.push(corner);
    }
  }
  
  // 3. Edges
  const edges = getEdgePositions(boardSize);
  for (const edge of edges) {
    if (board[edge] === null) {
      positions.push(edge);
    }
  }
  
  return positions;
};

/**
 * Make a move on the board and return the new state
 * @param {Array} board - Current board state
 * @param {number} index - Index to make the move
 * @param {string} player - Player symbol ('X' or 'O')
 * @returns {Array} - New board state
 */
export const makeMove = (board, index, player) => {
  if (board[index] !== null) {
    throw new Error('Invalid move: cell is already occupied');
  }
  
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};

/**
 * Reset the board to initial state
 * @param {number} boardSize - Size of the board
 * @returns {Array} - Empty board
 */
export const resetBoard = (boardSize) => {
  return createBoard(boardSize);
};

/**
 * Get board statistics
 * @param {Array} board - The board state array
 * @returns {Object} - Board statistics
 */
export const getBoardStats = (board) => {
  const boardSize = Math.sqrt(board.length);
  const stats = {
    size: boardSize,
    totalCells: board.length,
    emptyCells: 0,
    xCount: 0,
    oCount: 0,
    movesPlayed: 0
  };
  
  for (const cell of board) {
    if (cell === null || cell === undefined) {
      stats.emptyCells++;
    } else if (cell === 'X') {
      stats.xCount++;
      stats.movesPlayed++;
    } else if (cell === 'O') {
      stats.oCount++;
      stats.movesPlayed++;
    }
  }
  
  return stats;
};

/**
 * Display board in console (for debugging)
 * @param {Array} board - The board state array
 * @param {number} boardSize - Size of the board
 */
export const displayBoard = (board, boardSize) => {
  console.log(`\nBoard (${boardSize}×${boardSize}):`);
  for (let row = 0; row < boardSize; row++) {
    let rowStr = '';
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      const cell = board[index];
      rowStr += cell ? ` ${cell} ` : ' - ';
      if (col < boardSize - 1) rowStr += '|';
    }
    console.log(rowStr);
    if (row < boardSize - 1) {
      console.log('-'.repeat(rowStr.length));
    }
  }
  console.log('');
};
