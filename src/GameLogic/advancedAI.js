/**
 * Enhanced AI Strategy for Large Boards (5×5 and 6×6)
 * Implements advanced strategies for larger tic-tac-toe boards
 */

import { checkWinner, detectBoardSize, getEmptyCells } from './winChecker.js';
import { getStrategicPositions, getCornerPositions, getCenterPosition } from './boardUtils.js';

/**
 * Evaluate board position for a specific player
 * @param {Array} board - The board state array
 * @param {string} player - Player to evaluate for
 * @param {number} boardSize - Board size
 * @returns {number} - Position score
 */
const evaluatePosition = (board, player, boardSize) => {
  const winLength = boardSize;
  let score = 0;
  
  // Check all possible lines for potential wins
  const sequences = getAllSequences(boardSize, winLength);
  
  for (const sequence of sequences) {
    const lineScore = evaluateSequence(board, sequence, player, winLength);
    score += lineScore;
  }
  
  return score;
};

/**
 * Get all possible sequences of winLength for evaluation
 * @param {number} boardSize - Board size
 * @param {number} winLength - Required length to win
 * @returns {Array} - Array of sequences
 */
const getAllSequences = (boardSize, winLength) => {
  const sequences = [];
  
  // Rows
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      const sequence = [];
      for (let i = 0; i < winLength; i++) {
        sequence.push(row * boardSize + col + i);
      }
      sequences.push(sequence);
    }
  }
  
  // Columns
  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row <= boardSize - winLength; row++) {
      const sequence = [];
      for (let i = 0; i < winLength; i++) {
        sequence.push((row + i) * boardSize + col);
      }
      sequences.push(sequence);
    }
  }
  
  // Diagonals
  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      const sequence = [];
      for (let i = 0; i < winLength; i++) {
        sequence.push((row + i) * boardSize + col + i);
      }
      sequences.push(sequence);
    }
  }
  
  // Anti-diagonals
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
 * Evaluate a specific sequence for scoring
 * @param {Array} board - The board state array
 * @param {Array} sequence - Sequence of indices to evaluate
 * @param {string} player - Player to evaluate for
 * @param {number} winLength - Required length to win
 * @returns {number} - Sequence score
 */
const evaluateSequence = (board, sequence, player, winLength) => {
  let playerCount = 0;
  let opponentCount = 0;
  let emptyCount = 0;
  
  for (const index of sequence) {
    const cell = board[index];
    if (cell === player) {
      playerCount++;
    } else if (cell === null || cell === undefined) {
      emptyCount++;
    } else {
      opponentCount++;
    }
  }
  
  // If opponent has pieces in this sequence, it's not useful
  if (opponentCount > 0) {
    return 0;
  }
  
  // Score based on how many pieces player has in sequence
  if (playerCount === winLength) {
    return 1000; // Winning move
  } else if (playerCount === winLength - 1 && emptyCount === 1) {
    return 100; // One move away from winning
  } else if (playerCount === winLength - 2 && emptyCount === 2) {
    return 50; // Two moves away from winning
  } else if (playerCount === winLength - 3 && emptyCount === 3) {
    return 25; // Three moves away from winning
  } else if (playerCount > 0) {
    return playerCount * 5; // General progress
  }
  
  return 0;
};

/**
 * Find moves that create multiple threats
 * @param {Array} board - The board state array
 * @param {string} player - Player to check for
 * @param {number} boardSize - Board size
 * @returns {Array} - Array of moves that create multiple threats
 */
const findMultiThreatMoves = (board, player, boardSize) => {
  const emptyCells = getEmptyCells(board);
  const multiThreatMoves = [];
  
  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = player;
    
    // Count how many threats this move creates
    const threatCount = countThreats(testBoard, player, boardSize);
    
    if (threatCount >= 2) {
      multiThreatMoves.push({ cell, threatCount });
    }
  }
  
  // Sort by threat count (descending)
  multiThreatMoves.sort((a, b) => b.threatCount - a.threatCount);
  
  return multiThreatMoves.map(move => move.cell);
};

/**
 * Count the number of threats (sequences one move away from winning)
 * @param {Array} board - The board state array
 * @param {string} player - Player to check for
 * @param {number} boardSize - Board size
 * @returns {number} - Number of threats
 */
const countThreats = (board, player, boardSize) => {
  const winLength = boardSize;
  const sequences = getAllSequences(boardSize, winLength);
  let threatCount = 0;
  
  for (const sequence of sequences) {
    let playerCount = 0;
    let emptyCount = 0;
    
    for (const index of sequence) {
      const cell = board[index];
      if (cell === player) {
        playerCount++;
      } else if (cell === null || cell === undefined) {
        emptyCount++;
      } else {
        // Opponent has a piece, this sequence is not a threat
        playerCount = -1;
        break;
      }
    }
    
    // If this sequence is one move away from winning
    if (playerCount === winLength - 1 && emptyCount === 1) {
      threatCount++;
    }
  }
  
  return threatCount;
};

/**
 * Find moves that block opponent's multi-threats
 * @param {Array} board - The board state array
 * @param {string} aiPlayer - AI player symbol
 * @param {string} humanPlayer - Human player symbol
 * @param {number} boardSize - Board size
 * @returns {number|null} - Move to block multiple threats
 */
const findMultiThreatBlock = (board, aiPlayer, humanPlayer, boardSize) => {
  const emptyCells = getEmptyCells(board);
  let bestBlock = null;
  let maxThreatsBlocked = 0;
  
  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = aiPlayer;
    
    // Count how many opponent threats this blocks
    const originalThreats = countThreats(board, humanPlayer, boardSize);
    const remainingThreats = countThreats(testBoard, humanPlayer, boardSize);
    const threatsBlocked = originalThreats - remainingThreats;
    
    if (threatsBlocked > maxThreatsBlocked) {
      maxThreatsBlocked = threatsBlocked;
      bestBlock = cell;
    }
  }
  
  return bestBlock;
};

/**
 * Advanced minimax with alpha-beta pruning for larger boards
 * @param {Array} board - The board state array
 * @param {string} player - Current player
 * @param {string} aiPlayer - AI player symbol
 * @param {string} humanPlayer - Human player symbol
 * @param {number} boardSize - Board size
 * @param {number} depth - Current depth
 * @param {number} alpha - Alpha value for pruning
 * @param {number} beta - Beta value for pruning
 * @param {number} maxDepth - Maximum depth to search
 * @returns {Object} - Best move with score
 */
const advancedMinimax = (board, player, aiPlayer, humanPlayer, boardSize, depth = 0, alpha = -Infinity, beta = Infinity, maxDepth = 6) => {
  const emptyCells = getEmptyCells(board);
  
  // Base cases
  const winner = checkWinner(board);
  if (winner) {
    return {
      score: winner === aiPlayer ? 10000 - depth : depth - 10000,
      move: null
    };
  }
  
  if (emptyCells.length === 0 || depth >= maxDepth) {
    // Evaluate position using heuristic
    const aiScore = evaluatePosition(board, aiPlayer, boardSize);
    const humanScore = evaluatePosition(board, humanPlayer, boardSize);
    return { score: aiScore - humanScore, move: null };
  }
  
  let bestMove = null;
  
  if (player === aiPlayer) {
    let bestScore = -Infinity;
    
    for (const cell of emptyCells) {
      const newBoard = [...board];
      newBoard[cell] = player;
      
      const result = advancedMinimax(
        newBoard,
        humanPlayer,
        aiPlayer,
        humanPlayer,
        boardSize,
        depth + 1,
        alpha,
        beta,
        maxDepth
      );
      
      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = cell;
      }
      
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) {
        break; // Beta cutoff
      }
    }
    
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    
    for (const cell of emptyCells) {
      const newBoard = [...board];
      newBoard[cell] = player;
      
      const result = advancedMinimax(
        newBoard,
        aiPlayer,
        aiPlayer,
        humanPlayer,
        boardSize,
        depth + 1,
        alpha,
        beta,
        maxDepth
      );
      
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = cell;
      }
      
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) {
        break; // Alpha cutoff
      }
    }
    
    return { score: bestScore, move: bestMove };
  }
};

/**
 * Enhanced AI move for large boards (5×5 and 6×6)
 * @param {Array} board - The board state array
 * @param {string} aiPlayer - AI player symbol
 * @param {string} humanPlayer - Human player symbol
 * @param {number} boardSize - Board size
 * @returns {number} - Best move index
 */
export const getAdvancedAIMove = (board, aiPlayer = 'O', humanPlayer = 'X', boardSize = 5) => {
  const emptyCells = getEmptyCells(board);
  
  if (emptyCells.length === 0) return -1;
  
  console.log(`Advanced AI thinking for ${boardSize}×${boardSize} board...`);
  
  // 1. Try to win immediately
  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = aiPlayer;
    if (checkWinner(testBoard) === aiPlayer) {
      console.log('AI found winning move at:', cell);
      return cell;
    }
  }
  
  // 2. Block opponent from winning immediately
  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = humanPlayer;
    if (checkWinner(testBoard) === humanPlayer) {
      console.log('AI blocking immediate threat at:', cell);
      return cell;
    }
  }
  
  // 3. Look for multi-threat moves (create multiple winning opportunities)
  const multiThreatMoves = findMultiThreatMoves(board, aiPlayer, boardSize);
  if (multiThreatMoves.length > 0) {
    console.log('AI using multi-threat move:', multiThreatMoves[0]);
    return multiThreatMoves[0];
  }
  
  // 4. Block opponent's multi-threat moves
  const multiThreatBlock = findMultiThreatBlock(board, aiPlayer, humanPlayer, boardSize);
  if (multiThreatBlock !== null) {
    console.log('AI blocking multi-threat at:', multiThreatBlock);
    return multiThreatBlock;
  }
  
  // 5. Use advanced minimax with limited depth
  try {
    const maxDepth = boardSize === 5 ? 4 : 3; // Adjust depth based on board size
    const result = advancedMinimax(board, aiPlayer, aiPlayer, humanPlayer, boardSize, 0, -Infinity, Infinity, maxDepth);
    
    if (result && result.move !== null && result.move !== undefined) {
      console.log('AI using advanced minimax move:', result.move);
      return result.move;
    }
  } catch (error) {
    console.error('Advanced minimax error:', error);
  }
  
  // 6. Use strategic positioning with evaluation
  const strategicPositions = getStrategicPositions(board, boardSize);
  if (strategicPositions.length > 0) {
    // Evaluate each strategic position
    let bestStrategicMove = strategicPositions[0];
    let bestScore = -Infinity;
    
    for (const cell of strategicPositions) {
      const testBoard = [...board];
      testBoard[cell] = aiPlayer;
      const score = evaluatePosition(testBoard, aiPlayer, boardSize);
      
      if (score > bestScore) {
        bestScore = score;
        bestStrategicMove = cell;
      }
    }
    
    console.log('AI using evaluated strategic move:', bestStrategicMove);
    return bestStrategicMove;
  }
  
  // 7. Fallback to random move
  const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  console.log('AI using fallback random move:', randomMove);
  return randomMove;
};

/**
 * Check if a move creates a fork (multiple winning opportunities)
 * @param {Array} board - The board state array
 * @param {number} index - Move index to check
 * @param {string} player - Player to check for
 * @param {number} boardSize - Board size
 * @returns {boolean} - True if move creates a fork
 */
export const isForkMove = (board, index, player, boardSize) => {
  const testBoard = [...board];
  testBoard[index] = player;
  
  const threatCount = countThreats(testBoard, player, boardSize);
  return threatCount >= 2;
};

/**
 * Find moves that create forks
 * @param {Array} board - The board state array
 * @param {string} player - Player to check for
 * @param {number} boardSize - Board size
 * @returns {Array} - Array of fork moves
 */
export const findForkMoves = (board, player, boardSize) => {
  const emptyCells = getEmptyCells(board);
  const forkMoves = [];
  
  for (const cell of emptyCells) {
    if (isForkMove(board, cell, player, boardSize)) {
      forkMoves.push(cell);
    }
  }
  
  return forkMoves;
};
