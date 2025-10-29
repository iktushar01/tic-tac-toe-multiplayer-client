# Universal Tic Tac Toe Game Logic

This directory contains clean, modular game logic for Tic Tac Toe with support for multiple board sizes (3×3, 4×4, 5×5, 6×6) using classic win rules.

## 🎯 Classic Win Rules

- **3×3** → 3 in a row to win
- **4×4** → 4 in a row to win  
- **5×5** → 5 in a row to win
- **6×6** → 6 in a row to win

## 📁 File Structure

```
GameLogic/
├── winChecker.js          # Universal win detection logic
├── boardUtils.js          # Board creation and utility functions
├── enhancedGameLogic.js   # AI and advanced game features
├── index.js              # Central export point
└── testExamples.js       # Usage examples and tests
```

## 🚀 Quick Start

### Basic Usage

```javascript
import { checkWinner, createBoard, getGameStatus } from './GameLogic/index.js';

// Create a 3×3 board
const board = createBoard(3);

// Make some moves
board[0] = 'X';
board[1] = 'X'; 
board[2] = 'X';

// Check for winner
const winner = checkWinner(board);
console.log(winner); // Output: 'X'

// Check game status
const status = getGameStatus(board);
console.log(status); // Output: 'win'
```

### Universal checkWinner Function

The main `checkWinner` function automatically detects board size and applies classic win rules:

```javascript
import { checkWinner } from './GameLogic/winChecker.js';

// 3×3 board - X wins with 3 in a row
const board3x3 = [
  'X', 'X', 'X',
  null, 'O', null,
  'O', null, 'O'
];
console.log(checkWinner(board3x3)); // Output: 'X'

// 4×4 board - O wins with 4 in a row
const board4x4 = [
  'O', 'X', 'X', 'O',
  'O', 'X', 'O', 'X', 
  'O', 'O', 'X', 'O',
  'O', 'X', 'X', 'O'
];
console.log(checkWinner(board4x4)); // Output: 'O'

// 5×5 board - No winner yet
const board5x5 = [
  'X', 'O', null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null
];
console.log(checkWinner(board5x5)); // Output: null
```

## 🔧 API Reference

### winChecker.js

#### `checkWinner(board)`
- **Parameters**: `board` (Array) - Board state array
- **Returns**: `string|null` - 'X', 'O', or null
- **Description**: Universal winner detection for any supported board size

#### `getGameStatus(board)`
- **Parameters**: `board` (Array) - Board state array  
- **Returns**: `string` - 'win', 'draw', or 'playing'
- **Description**: Get current game status

#### `isBoardFull(board)`
- **Parameters**: `board` (Array) - Board state array
- **Returns**: `boolean` - True if board is full
- **Description**: Check if board has no empty cells

#### `detectBoardSize(board)`
- **Parameters**: `board` (Array) - Board state array
- **Returns**: `number` - Detected board size (3, 4, 5, or 6)
- **Description**: Automatically detect board size from array length

### boardUtils.js

#### `createBoard(size)`
- **Parameters**: `size` (number) - Board size (3, 4, 5, or 6)
- **Returns**: `Array` - Empty board array
- **Description**: Create empty board for given size

#### `getBoardSizeOptions()`
- **Returns**: `Array` - Available board size options with metadata
- **Description**: Get all supported board sizes with labels and difficulty

#### `getStrategicPositions(board, boardSize)`
- **Parameters**: `board` (Array), `boardSize` (number)
- **Returns**: `Array` - Strategic positions ordered by preference
- **Description**: Get center, corners, and edges for AI strategy

### enhancedGameLogic.js

#### `getAIMove(board, aiPlayer, humanPlayer, size)`
- **Parameters**: `board` (Array), `aiPlayer` (string), `humanPlayer` (string), `size` (number)
- **Returns**: `number` - Best move index
- **Description**: Smart AI that uses different strategies based on board size:
  - **3×3 & 4×4**: Full minimax algorithm
  - **5×5 & 6×6**: Advanced AI with multi-threat detection

### advancedAI.js

#### `getAdvancedAIMove(board, aiPlayer, humanPlayer, boardSize)`
- **Parameters**: `board` (Array), `aiPlayer` (string), `humanPlayer` (string), `boardSize` (number)
- **Returns**: `number` - Best move index
- **Description**: Enhanced AI specifically for large boards (5×5, 6×6) with:
  - Multi-threat creation and blocking
  - Advanced minimax with alpha-beta pruning
  - Fork move detection
  - Position evaluation heuristics

#### `isForkMove(board, index, player, boardSize)`
- **Parameters**: `board` (Array), `index` (number), `player` (string), `boardSize` (number)
- **Returns**: `boolean` - True if move creates multiple threats
- **Description**: Check if a move creates a fork (multiple winning opportunities)

#### `findForkMoves(board, player, boardSize)`
- **Parameters**: `board` (Array), `player` (string), `boardSize` (number)
- **Returns**: `Array` - Array of fork move indices
- **Description**: Find all moves that create multiple threats

## 🧪 Testing

Run the test examples to see the functions in action:

```javascript
// Basic functionality tests
import './GameLogic/testExamples.js';

// Advanced AI tests for large boards
import './GameLogic/testAdvancedAI.js';
```

This will output test results for all board sizes and scenarios, including advanced AI demonstrations.

## 🔄 Migration from Old Logic

If you're updating from the old game logic:

1. **Replace imports**:
   ```javascript
   // Old
   import { checkWinner } from './enhancedGameLogic.js';
   
   // New  
   import { checkWinner } from './GameLogic/index.js';
   ```

2. **Update function calls**:
   ```javascript
   // Old (required size parameter)
   const winner = checkWinner(board, 3);
   
   // New (size auto-detected)
   const winner = checkWinner(board);
   ```

3. **Classic win rules now apply**:
   - 4×4 boards now require 4 in a row (not 3)
   - 5×5 boards now require 5 in a row (not 4)
   - 6×6 boards now require 6 in a row (not 4)

## 🎮 Integration Example

```javascript
import { 
  checkWinner, 
  createBoard, 
  getGameStatus, 
  makeMove,
  getAIMove 
} from './GameLogic/index.js';

class TicTacToeGame {
  constructor(boardSize = 3) {
    this.board = createBoard(boardSize);
    this.boardSize = boardSize;
    this.currentPlayer = 'X';
  }
  
  makePlayerMove(index) {
    if (this.board[index] !== null) return false;
    
    this.board[index] = this.currentPlayer;
    
    const winner = checkWinner(this.board);
    if (winner) {
      console.log(`Player ${winner} wins!`);
      return true;
    }
    
    if (getGameStatus(this.board) === 'draw') {
      console.log('Game is a draw!');
      return true;
    }
    
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    return false;
  }
  
  makeAIMove() {
    const aiIndex = getAIMove(this.board, 'O', 'X', this.boardSize);
    return this.makePlayerMove(aiIndex);
  }
}
```

## 🏆 Features

- ✅ **Universal**: Works with 3×3, 4×4, 5×5, and 6×6 boards
- ✅ **Classic Rules**: Win length equals board size
- ✅ **Auto-Detection**: Automatically detects board size
- ✅ **Clean Code**: Modular, well-documented functions
- ✅ **Smart AI**: Different strategies for different board sizes
  - **3×3 & 4×4**: Full minimax algorithm
  - **5×5 & 6×6**: Advanced AI with multi-threat detection
- ✅ **Advanced AI Features**:
  - Multi-threat creation and blocking
  - Fork move detection
  - Alpha-beta pruning for performance
  - Position evaluation heuristics
- ✅ **Type Safe**: Comprehensive JSDoc documentation
- ✅ **Tested**: Includes test examples and validation
