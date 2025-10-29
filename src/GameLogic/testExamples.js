/**
 * Test Examples for Universal checkWinner Function
 * Demonstrates the function working with different board sizes
 */

import { checkWinner, getGameStatus, isBoardFull } from './winChecker.js';
import { createBoard, displayBoard } from './boardUtils.js';

// Test 3×3 board - X wins with 3 in a row
console.log('=== Testing 3×3 Board ===');
const board3x3 = [
  'X', 'X', 'X',
  null, 'O', null,
  'O', null, 'O'
];
displayBoard(board3x3, 3);
console.log('Winner:', checkWinner(board3x3)); // Should output: 'X'
console.log('Game Status:', getGameStatus(board3x3)); // Should output: 'win'

// Test 4×4 board - O wins with 4 in a row
console.log('\n=== Testing 4×4 Board ===');
const board4x4 = [
  'O', 'X', 'X', 'O',
  'O', 'X', 'O', 'X',
  'O', 'O', 'X', 'O',
  'O', 'X', 'X', 'O'
];
displayBoard(board4x4, 4);
console.log('Winner:', checkWinner(board4x4)); // Should output: 'O'
console.log('Game Status:', getGameStatus(board4x4)); // Should output: 'win'

// Test 5×5 board - X wins diagonally
console.log('\n=== Testing 5×5 Board ===');
const board5x5 = createBoard(5);
// Fill diagonal with X's
for (let i = 0; i < 5; i++) {
  board5x5[i * 6] = 'X'; // Main diagonal
}
displayBoard(board5x5, 5);
console.log('Winner:', checkWinner(board5x5)); // Should output: 'X'
console.log('Game Status:', getGameStatus(board5x5)); // Should output: 'win'

// Test 6×6 board - No winner yet
console.log('\n=== Testing 6×6 Board (No Winner) ===');
const board6x6 = createBoard(6);
// Fill some random positions
board6x6[0] = 'X';
board6x6[1] = 'O';
board6x6[7] = 'X';
board6x6[8] = 'O';
displayBoard(board6x6, 6);
console.log('Winner:', checkWinner(board6x6)); // Should output: null
console.log('Game Status:', getGameStatus(board6x6)); // Should output: 'playing'

// Test draw scenario
console.log('\n=== Testing Draw Scenario ===');
const drawBoard = [
  'X', 'O', 'X',
  'O', 'X', 'O',
  'O', 'X', 'O'
];
displayBoard(drawBoard, 3);
console.log('Winner:', checkWinner(drawBoard)); // Should output: null
console.log('Game Status:', getGameStatus(drawBoard)); // Should output: 'draw'
console.log('Is Board Full:', isBoardFull(drawBoard)); // Should output: true

export { checkWinner, getGameStatus, isBoardFull };
