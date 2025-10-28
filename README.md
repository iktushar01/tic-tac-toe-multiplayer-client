# 🎮 X-O Arena - Multiplayer Tic Tac Toe

A modern, responsive multiplayer Tic Tac Toe game built with React and Tailwind CSS. Features include real-time gameplay, user authentication, statistics tracking, and a beautiful dark/light theme.

## 🚀 Features

### Core Features
- **Multiplayer Gameplay**: Create games, join by room code, or quick match
- **User Authentication**: Login and registration system
- **Statistics Dashboard**: Track wins, losses, draws, and win rate
- **Leaderboard**: See top players and rankings
- **Profile Management**: Edit profile, view stats, customize settings
- **Dark/Light Theme**: Toggle between themes (DaisyUI powered)

### Pages
- **Home/Lobby**: Create/join games, view online players, recent matches
- **Game Room**: Play Tic Tac Toe with live chat
- **Dashboard**: View statistics, match history, and leaderboard
- **Profile**: Manage account settings and view performance

## 📁 Project Structure

```
Tic-Tac-Toe-Client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Footer.jsx      # Footer with social links
│   │   ├── TicTacToeBoard.jsx  # Game board component
│   │   ├── PlayerCard.jsx   # Player display card
│   │   ├── MatchCard.jsx    # Match history card
│   │   ├── StatsCard.jsx    # Statistics card
│   │   └── LeaderboardCard.jsx  # Leaderboard card
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Main lobby/home page
│   │   ├── GameRoom.jsx    # Game room page
│   │   ├── Dashboard.jsx   # User dashboard
│   │   ├── Profile.jsx     # User profile
│   │   ├── Login.jsx       # Login page
│   │   └── Register.jsx    # Registration page
│   ├── context/            # React Context
│   │   └── AuthContext.jsx  # Authentication context
│   ├── services/           # API services
│   │   └── api.js          # API service (placeholder)
│   ├── utils/              # Utility functions
│   │   └── helpers.js      # Helper functions
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
└── package.json
```

## 🛠️ Technologies Used

- **React 19**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS v4**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind
- **Vite**: Build tool and dev server
- **ESLint**: Code linting

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🎯 Usage

### Getting Started

1. Start the development server
2. Navigate to the app (default: `http://localhost:5173`)
3. Register a new account or login
4. Explore the features:
   - Create/Join games
   - View statistics
   - Play against others
   - Customize your profile

### Demo Credentials

For testing purposes, use any email/password combination. The app uses placeholder authentication.

## 🎨 Design Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern UI**: Clean, modern interface with smooth animations
- **Theme Support**: Dark/Light mode toggle
- **Color Palette**: Custom primary, secondary, and accent colors
- **Icons**: Emoji icons for visual appeal
- **Shadows & Rounded Corners**: Modern card designs
- **Hover Effects**: Interactive elements

## 🔧 Customization

### Theme Colors

Edit theme colors in `src/index.css`:
```css
@theme {
  --color-primary: #6366f1;    /* Indigo */
  --color-secondary: #8b5cf6;  /* Purple */
  --color-accent: #ec4899;     /* Pink */
}
```

### DaisyUI Themes

The app uses DaisyUI themes. You can change themes by modifying the `data-theme` attribute in `App.jsx` or via the toggle in the Profile page.

## 📝 Notes

- **Backend Integration**: The current implementation uses placeholder API services. Integrate with your backend by updating `src/services/api.js`
- **Real-time Features**: Currently uses simulated data. For real-time multiplayer, integrate WebSocket connections
- **Authentication**: Uses localStorage for demo purposes. Replace with proper JWT/auth system
- **Testing**: Create tests using Jest, React Testing Library, or Cypress

## 🚧 Future Enhancements

- [ ] Real-time WebSocket integration
- [ ] Real multiplayer functionality
- [ ] Tournament mode
- [ ] Voice chat
- [ ] Spectator mode
- [ ] Replay system
- [ ] Mobile app version
- [ ] Achievement system
- [ ] Social features (friends, chat)

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Built with ❤️ for the multiplayer gaming experience

---

**Enjoy playing X-O Arena! 🎮**
