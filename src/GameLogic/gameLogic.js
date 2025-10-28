// Game Logic Utilities for Tic Tac Toe

/**
 * Check if there's a winner on the board
 * @param {Array} squares - The board state array (9 elements)
 * @returns {Object|null} - Returns {winner: 'X'|'O', line: [indices]} or null
 */
export const checkWinner = (squares) => {
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

/**
 * Check if the board is full (all cells are filled)
 * @param {Array} squares - The board state array
 * @returns {boolean} - True if board is full
 */
export const isBoardFull = (squares) => {
  return squares.every((cell) => cell !== null);
};

/**
 * Check if the game is finished (win or draw)
 * @param {Array} squares - The board state array
 * @returns {string|null} - Returns 'win', 'draw', or null
 */
export const getGameStatus = (squares) => {
  const result = checkWinner(squares);
  if (result) {
    return 'win';
  } else if (isBoardFull(squares)) {
    return 'draw';
  }
  return null;
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
 * Validate a move
 * @param {Array} board - The board state array
 * @param {number} index - The cell index to validate
 * @returns {boolean} - True if move is valid
 */
export const isValidMove = (board, index) => {
  return board[index] === null;
};

/**
 * Make a move on the board
 * @param {Array} board - The board state array
 * @param {number} index - The cell index to make a move
 * @param {string} player - The player ('X' or 'O')
 * @returns {Object} - Returns {newBoard: [...], status: string, winner: string|null}
 */
export const makeMove = (board, index, player) => {
  const newBoard = [...board];
  newBoard[index] = player;

  const result = checkWinner(newBoard);
  const status = result ? 'win' : isBoardFull(newBoard) ? 'draw' : 'playing';

  return {
    newBoard,
    status,
    winner: result ? result.winner : null,
    winningLine: result ? result.line : [],
  };
};

