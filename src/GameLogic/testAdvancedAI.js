/**
 * Test Advanced AI for Large Boards
 * Demonstrates the enhanced AI capabilities for 5×5 and 6×6 boards
 */

import { getAdvancedAIMove, isForkMove, findForkMoves } from './advancedAI.js';
import { createBoard, displayBoard } from './boardUtils.js';
import { checkWinner } from './winChecker.js';

console.log('🤖 Testing Advanced AI for Large Boards\n');

// Test 5×5 board AI
console.log('=== Testing 5×5 Board AI ===');
const board5x5 = createBoard(5);

// Set up a scenario where AI can create multiple threats
board5x5[0] = 'O';  // AI
board5x5[1] = 'X';  // Human
board5x5[2] = 'O';  // AI
board5x5[5] = 'X';  // Human
board5x5[6] = 'O';  // AI
board5x5[7] = 'X';  // Human

console.log('Initial board state:');
displayBoard(board5x5, 5);

// Test fork detection
const forkMoves = findForkMoves(board5x5, 'O', 5);
console.log('Fork moves available for AI:', forkMoves);

// Get AI move
const aiMove5x5 = getAdvancedAIMove(board5x5, 'O', 'X', 5);
console.log(`AI chooses move at index: ${aiMove5x5}`);

// Make the move and show result
board5x5[aiMove5x5] = 'O';
console.log('\nAfter AI move:');
displayBoard(board5x5, 5);

// Test 6×6 board AI
console.log('\n=== Testing 6×6 Board AI ===');
const board6x6 = createBoard(6);

// Set up a more complex scenario
board6x6[0] = 'O';   // AI
board6x6[1] = 'X';   // Human
board6x6[2] = 'O';   // AI
board6x6[6] = 'X';   // Human
board6x6[7] = 'O';   // AI
board6x6[8] = 'X';   // Human
board6x6[12] = 'O';  // AI
board6x6[13] = 'X';  // Human

console.log('Initial board state:');
displayBoard(board6x6, 6);

// Test fork detection
const forkMoves6x6 = findForkMoves(board6x6, 'O', 6);
console.log('Fork moves available for AI:', forkMoves6x6);

// Get AI move
const aiMove6x6 = getAdvancedAIMove(board6x6, 'O', 'X', 6);
console.log(`AI chooses move at index: ${aiMove6x6}`);

// Make the move and show result
board6x6[aiMove6x6] = 'O';
console.log('\nAfter AI move:');
displayBoard(board6x6, 6);

// Test AI vs AI simulation
console.log('\n=== AI vs AI Simulation (5×5) ===');
const simulationBoard = createBoard(5);
let currentPlayer = 'X';
let moveCount = 0;
const maxMoves = 10; // Limit for demo

while (moveCount < maxMoves && checkWinner(simulationBoard) === null) {
  const aiMove = getAdvancedAIMove(simulationBoard, currentPlayer, currentPlayer === 'X' ? 'O' : 'X', 5);
  
  if (aiMove === -1) break;
  
  simulationBoard[aiMove] = currentPlayer;
  moveCount++;
  
  console.log(`Move ${moveCount}: ${currentPlayer} plays at ${aiMove}`);
  
  if (checkWinner(simulationBoard)) {
    console.log(`🎉 ${checkWinner(simulationBoard)} wins!`);
    break;
  }
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

console.log('\nFinal board state:');
displayBoard(simulationBoard, 5);

console.log('\n✅ Advanced AI testing completed!');
console.log('\nKey improvements for large boards:');
console.log('• Multi-threat detection and creation');
console.log('• Advanced minimax with alpha-beta pruning');
console.log('• Fork move detection');
console.log('• Position evaluation heuristics');
console.log('• Strategic blocking of opponent threats');
