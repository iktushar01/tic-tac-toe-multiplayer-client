# 🎮 X-O Arena - Multiplayer Tic Tac Toe

A modern, full-stack multiplayer Tic Tac Toe game built with React, Node.js, MongoDB, and Firebase. Features real-time gameplay, user authentication, coin-based betting system, daily rewards, and comprehensive statistics tracking.

## 🚀 Features

### Core Features
- **🎯 Multiple Game Modes**
  - Computer Mode (Easy/Medium/Hard AI)
  - Room-based Multiplayer
  - Quick Match
  - Betting Mode with Coins
  
- **💰 Coin System**
  - Start with 5000 coins
  - Daily rewards (100-400 coins based on streak)
  - Betting on Computer Mode games
  - Win 2x your bet, draw 50% refund, lose full bet
  - Complete coin statistics tracking

- **👥 Social Features**
  - Friend system (add/remove friends)
  - Friend requests
  - Challenge friends to games
  - User search and discovery

- **🔐 Authentication & Security**
  - Firebase Authentication integration
  - JWT token validation
  - Secure API endpoints
  - Protected routes

- **📊 Statistics & Analytics**
  - Win/Loss/Draw tracking
  - Win rate calculation
  - Coin earnings and betting history
  - Match history
  - Leaderboard rankings

### Pages
- **Home/Lobby**: Game mode selection, quick access
- **Computer Mode**: Play against AI with multiple difficulty levels and board sizes
- **Multiplayer Rooms**: Real-time games with other players
- **Dashboard**: Statistics, friend management, match history
- **Profile**: Edit profile, view stats, manage account
- **Inventory**: Daily coin claims, coin statistics, streak tracking
- **Leaderboard**: Top players and rankings
- **Settings**: Theme preferences and account settings

## 📁 Project Structure

```
Tic-Tac-Toe-Client/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx          # Navigation with coin display
│   │   ├── Footer.jsx          # Footer component
│   │   ├── CoinDisplay.jsx     # Live coin balance display
│   │   ├── BettingPanel.jsx    # Betting interface
│   │   ├── BettingResultModal.jsx  # Bet result display
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── pages/                  # Page components
│   │   ├── Home/
│   │   │   └── Home.jsx        # Main landing page
│   │   ├── GameRoom/
│   │   │   ├── ComputerGameRoom.jsx    # AI game mode
│   │   │   ├── MultiplayerGameRoom.jsx # Multiplayer mode
│   │   │   ├── RoomGameRoom.jsx        # Room-based games
│   │   │   ├── RoomSelector.jsx        # Room selection
│   │   │   ├── TicTacToeBoard.jsx      # Basic board
│   │   │   └── EnhancedTicTacToeBoard.jsx  # Advanced board
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx           # Main dashboard
│   │   │   ├── components/             # Dashboard components
│   │   │   │   ├── DashboardHeader.jsx
│   │   │   │   ├── StatsCardsSection.jsx
│   │   │   │   ├── MatchHistorySection.jsx
│   │   │   │   ├── FriendsTab.jsx
│   │   │   │   ├── UsersTab.jsx
│   │   │   │   └── FriendRequestsTab.jsx
│   │   │   ├── hooks/                  # Custom hooks
│   │   │   │   ├── useDashboardData.js
│   │   │   │   └── useFriendActions.js
│   │   │   └── utils/
│   │   │       ├── formatters.js
│   │   │       └── gameUtils.jsx
│   │   ├── Profile/
│   │   │   └── Profile.jsx     # User profile with coins
│   │   ├── Inventory/
│   │   │   └── Inventory.jsx   # Coin management & daily rewards
│   │   ├── Leaderboard/
│   │   │   └── Leaderboard.jsx # Rankings
│   │   ├── Settings/
│   │   │   └── Settings.jsx    # User settings
│   │   ├── Login/
│   │   │   └── Login.jsx       # Login page
│   │   └── Register/
│   │       └── Register.jsx    # Registration page
│   ├── context/                # React Context
│   │   └── AuthContext.jsx    # Authentication state
│   ├── services/               # API services
│   │   ├── api.js             # Backend API integration
│   │   ├── socketService.js   # WebSocket for real-time
│   │   └── imgbb.js           # Image upload service
│   ├── GameLogic/              # Game algorithms
│   │   ├── gameLogic.js       # Basic game logic
│   │   ├── enhancedGameLogic.js  # Multi-board logic
│   │   ├── advancedAI.js      # AI algorithms
│   │   ├── winChecker.js      # Win detection
│   │   ├── boardUtils.js      # Board utilities
│   │   └── index.js           # Exports
│   ├── routes/
│   │   └── AppRoutes.jsx      # Route configuration
│   ├── utils/                 # Utility functions
│   │   ├── helpers.js         # Helper functions
│   │   └── colors.js          # Color utilities
│   ├── firebase.js            # Firebase configuration
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
└── package.json
```

## 🛠️ Technologies Used

### Frontend
- **React 19**: Latest UI library with concurrent features
- **React Router v6**: Client-side routing
- **Tailwind CSS v4**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Firebase Auth**: User authentication
- **Socket.io Client**: Real-time communication
- **SweetAlert2**: Beautiful alerts
- **React Icons**: Icon library
- **Vite**: Fast build tool and dev server

### Backend Integration
- **Node.js + Express**: REST API server
- **MongoDB**: Database for users and games
- **Socket.io**: Real-time multiplayer
- **JWT**: Secure authentication
- **Firebase Admin**: Server-side auth validation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)
- Firebase project

### Client Setup

1. **Navigate to client directory**:
   ```bash
   cd Tic-Tac-Toe-Client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   
   Create `src/firebase.js` with your Firebase config:
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   ```

4. **Configure API endpoint**:
   
   Update `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api'; // Your backend URL
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```

7. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🎯 Usage

### Getting Started

1. **Register an Account**
   - Navigate to `/register`
   - Create account with email/password
   - Receive 5000 starting coins

2. **Play Computer Mode**
   - Select board size (3x3 to 6x6)
   - Choose AI difficulty (Easy/Medium/Hard)
   - Play for free OR enable betting mode
   - Win coins with betting mode!

3. **Daily Rewards**
   - Visit Inventory page
   - Claim daily reward (100-400 coins)
   - Build streak for bigger rewards
   - Track coin statistics

4. **Social Features**
   - Add friends from Dashboard
   - Accept/reject friend requests
   - Challenge friends to games

5. **Track Progress**
   - View stats on Dashboard
   - Check Profile for detailed info
   - Climb the Leaderboard

## 💰 Coin System

### Earning Coins
- **Daily Rewards**: Claim every 24 hours
  - Day 1: 100 coins
  - Day 2: 150 coins
  - Day 3: 200 coins
  - Day 4: 250 coins
  - Day 5: 300 coins
  - Day 6: 350 coins
  - Day 7+: 400 coins (max)

- **Betting Wins**: 2x your bet amount
- **Draw Refund**: 50% of bet returned

### Spending Coins
- Bet on Computer Mode games
- Available bets: 100, 200, 500, 1000, 2000 coins
- More features coming soon!

### Betting Rules
| Result | Calculation | Example (500 bet) |
|--------|-------------|-------------------|
| 🏆 Win | +100% profit | +1000 coins |
| 🤝 Draw | +50% refund | -250 coins |
| 💀 Loss | -100% lost | -500 coins |

## 🎨 Design Features

- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Modern UI**: Clean interface with smooth animations
- **Dark Theme**: Eye-friendly dark mode throughout
- **Gradient Cards**: Beautiful gradient designs for coins
- **Live Updates**: Real-time coin balance in navbar
- **Animated Icons**: Engaging micro-animations
- **Toast Notifications**: User-friendly feedback
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: Graceful error displays

## 🔧 Configuration

### Environment Variables

Create `.env` file in client root:
```env
VITE_API_URL=http://localhost:3000
VITE_IMGBB_API_KEY=your_imgbb_key_here
```

### Board Sizes

Supported board configurations:
- 3x3 (Classic) - 3 in a row to win
- 4x4 (Medium) - 4 in a row to win
- 5x5 (Large) - 4 in a row to win
- 6x6 (Extra Large) - 5 in a row to win

### AI Difficulty Levels

- **Easy**: Random moves
- **Medium**: Strategic AI with minimax (3x3 boards)
- **Hard**: Advanced minimax with optimization

## 📊 API Integration

### Key Endpoints

```javascript
// Authentication
POST /api/users/login
GET  /api/users/me

// Coins
GET  /api/users/coins/balance
POST /api/users/coins/bet/place
POST /api/users/coins/bet/complete
POST /api/users/coins/daily-claim
GET  /api/users/coins/daily-claim/status

// Games
POST /api/users/computer-game/create
POST /api/users/computer-game/move
POST /api/users/computer-game/complete

// Social
GET  /api/users/all
GET  /api/users/friends/list
POST /api/users/friends/request/:userId
POST /api/users/friends/accept/:userId
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build check
npm run build
```

## 📝 Notes

### Security
- All coin transactions are server-side
- JWT authentication required
- Input validation on both client and server
- Protected API endpoints
- No client-side coin manipulation

### Performance
- Lazy loading for routes
- Optimized re-renders with React.memo
- Efficient state management
- Cached API responses
- Debounced inputs

### Data Flow
```
MongoDB → Express API → React Frontend
   ↑           ↓              ↓
Firebase Auth ←→ JWT Token ← User Actions
```

## 🚧 Future Enhancements

### Planned Features
- [ ] Coin shop (buy avatars, themes, emojis)
- [ ] Tournament mode with prize pools
- [ ] Achievements and badges
- [ ] Spectator mode for live games
- [ ] Voice chat integration
- [ ] Replay system
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Weekly challenges
- [ ] Season passes
- [ ] Custom board themes
- [ ] Player rankings by coin balance
- [ ] Trading system between players
- [ ] VIP membership tiers

### In Development
- Real-time multiplayer improvements
- Enhanced friend system
- More AI personalities
- Advanced statistics

## 🐛 Known Issues

- Socket.io reconnection needs improvement
- Image upload size validation
- Mobile landscape orientation
- Safari-specific animations

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow existing code style
2. Add comments for complex logic
3. Test before committing
4. Update documentation as needed

## 👤 Author

Built with ❤️ for the multiplayer gaming community

## 🙏 Acknowledgments

- Firebase for authentication
- MongoDB for database
- Tailwind CSS for styling
- React team for amazing framework
- Open source community

---

**Enjoy playing X-O Arena! 🎮**

**Current Version**: 2.0.0 (Coin System Update)
**Last Updated**: October 2025

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation

---

### Quick Start Checklist
- [ ] Install dependencies
- [ ] Configure Firebase
- [ ] Set API endpoint
- [ ] Start dev server
- [ ] Register account
- [ ] Claim daily reward
- [ ] Play first game
- [ ] Try betting mode
- [ ] Add friends
- [ ] Check leaderboard

**Happy Gaming! 🎲**
