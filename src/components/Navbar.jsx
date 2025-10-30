import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoinDisplay from './CoinDisplay';
import { 
  IoHome, 
  IoStatsChart, 
  IoTrophy, 
  IoCash, 
  IoPerson, 
  IoSettings,
  IoLogOut,
  IoClose,
  IoMenu
} from 'react-icons/io5';

// Super Unique Animated Logo Component
const UniqueAnimatedLogo = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-3">
        {/* Animated Logo Container */}
        <motion.div 
          className="relative w-12 h-12 sm:w-14 sm:h-14"
          animate={{ 
            rotateY: hovered ? 360 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-[2px]"
            animate={{
              rotate: hovered ? 360 : 0,
            }}
            transition={{ duration: 2, ease: "linear", repeat: hovered ? Infinity : 0 }}
          >
            <div className="w-full h-full bg-gray-900 rounded-2xl"></div>
          </motion.div>
          
          {/* Inner Glow */}
          <motion.div
            className="absolute inset-1 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 blur-md opacity-60"
            animate={{
              opacity: hovered ? [0.6, 1, 0.6] : 0.6,
              scale: hovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Main Logo Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10">
              {/* X and O Symbols */}
              <motion.div
                className="text-2xl sm:text-3xl font-black"
                animate={{
                  backgroundImage: hovered 
                    ? ['linear-gradient(45deg, #06b6d4, #8b5cf6)', 'linear-gradient(225deg, #ec4899, #06b6d4)', 'linear-gradient(45deg, #06b6d4, #8b5cf6)']
                    : 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                }}
                transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <span className="relative inline-block">
                  <motion.span
                    animate={{ rotate: hovered ? [0, 180] : 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    X
                  </motion.span>
                  <motion.span
                    animate={{ rotate: hovered ? [0, -180] : 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    O
                  </motion.span>
                </span>
              </motion.div>
              
              {/* Sparkle Effects */}
              <AnimatePresence>
                {hovered && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ 
                          x: 0, 
                          y: 0, 
                          opacity: 1,
                          scale: 0 
                        }}
                        animate={{ 
                          x: [0, (i - 1) * 20],
                          y: [0, -20 + i * 10],
                          opacity: [1, 0],
                          scale: [0, 1, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 0.8,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 0.5
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Arena Text */}
        <div className="flex flex-col">
          <motion.div
            className="text-xl sm:text-2xl font-black tracking-tight"
            animate={{
              backgroundImage: hovered
                ? ['linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)', 'linear-gradient(90deg, #ec4899, #06b6d4, #8b5cf6)', 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)']
                : 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)',
            }}
            transition={{ duration: 3, repeat: hovered ? Infinity : 0 }}
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
            }}
          >
            ARENA
          </motion.div>
          <motion.div 
            className="text-[8px] sm:text-[10px] font-semibold text-gray-400 tracking-widest -mt-1"
            animate={{
              color: hovered ? '#06b6d4' : '#9ca3af'
            }}
          >
            TIC•TAC•TOE
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Detect scroll for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-cyan-500/20' 
            : 'bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-700/50'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left */}
            <Link to="/login" className="flex-shrink-0">
              <UniqueAnimatedLogo />
            </Link>
            
            {/* Navigation - Center */}
            <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              <motion.div 
                className="text-xs sm:text-sm font-medium text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0)',
                    '0 0 20px rgba(6, 182, 212, 0.2)',
                    '0 0 20px rgba(6, 182, 212, 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🎮 Play Tic-Tac-Toe Online
              </motion.div>
            </div>
            
            {/* User Section - Right */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/login" 
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-cyan-400 transition-all rounded-lg hover:bg-gray-800/70 border border-transparent hover:border-cyan-500/30"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/register" 
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">Sign Up</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
    );
  }

  const navItems = [
    { path: '/', label: 'Home', icon: IoHome },
    { path: '/dashboard', label: 'Dashboard', icon: IoStatsChart },
    { path: '/leaderboard', label: 'Leaderboard', icon: IoTrophy },
    { path: '/inventory', label: 'Inventory', icon: IoCash },
    { path: '/profile', label: 'Profile', icon: IoPerson },
    { path: '/settings', label: 'Settings', icon: IoSettings },
  ];

  return (
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-cyan-500/20' 
          : 'bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-700/50'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo - Left */}
          <Link to="/" className="flex-shrink-0">
            <UniqueAnimatedLogo />
          </Link>
          
          {/* Navigation Menu - Center */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-3 xl:px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm font-medium group overflow-hidden ${
                      active
                        ? 'text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {/* Active Background */}
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover Background */}
                    {!active && (
                      <div className="absolute inset-0 bg-gray-800/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    
                    {/* Icon & Text */}
                    <Icon className={`text-base xl:text-lg relative z-10 ${active ? 'animate-pulse' : ''}`} />
                    <span className="relative z-10 hidden xl:inline">{item.label}</span>
                    
                    {/* Active Indicator */}
                    {active && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
          
          {/* User Section - Right */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Coin Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CoinDisplay />
            </motion.div>
            
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/70 rounded-xl transition-all border border-transparent hover:border-cyan-500/30"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoClose className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoMenu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              {/* Mobile Menu Dropdown */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-64 bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 py-2 overflow-hidden"
                  >
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      
                      return (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link 
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 transition-all relative group ${
                              active 
                                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-l-4 border-cyan-400' 
                                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white border-l-4 border-transparent'
                            }`}
                          >
                            <Icon className={`text-xl ${active ? 'animate-pulse' : ''}`} />
                            <span className="font-medium">{item.label}</span>
                            {active && (
                              <motion.div
                                className="absolute right-4 w-2 h-2 bg-cyan-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                    
                    <div className="border-t border-gray-700/50 my-2"></div>
                    
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.05 }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all group"
                    >
                      <IoLogOut className="text-xl group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Logout</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar Menu - Desktop */}
            <div className="hidden lg:block relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="relative group"
              >
                <motion.div
                  className="w-11 h-11 rounded-full overflow-hidden shadow-lg border-2 border-transparent hover:border-cyan-400 transition-all relative"
                  animate={{
                    boxShadow: userMenuOpen 
                      ? '0 0 30px rgba(6, 182, 212, 0.5)'
                      : '0 0 0px rgba(6, 182, 212, 0)'
                  }}
                >
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL}
                      alt={user?.displayName || user?.email}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="font-bold text-sm flex items-center justify-center w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white absolute inset-0">
                    <IoPerson className="w-6 h-6" />
                  </span>
                </motion.div>
                
                {/* Online Status Indicator */}
                <motion.div
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
              
              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-72 bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 z-50 overflow-hidden"
                  >
                    {/* User Info Header */}
                    <motion.div 
                      className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-gray-700/50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center">
                          {user?.photoURL ? (
                            <img 
                              src={user.photoURL}
                              alt={user?.displayName || user?.email}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <IoPerson className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white truncate">{user?.displayName || 'User'}</p>
                          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Quick Links */}
                    <div className="py-2">
                      {[
                        { path: '/dashboard', icon: IoStatsChart, label: 'Dashboard', color: 'text-cyan-400' },
                        { path: '/leaderboard', icon: IoTrophy, label: 'Leaderboard', color: 'text-yellow-400' },
                        { path: '/profile', icon: IoPerson, label: 'Profile', color: 'text-blue-400' },
                        { path: '/settings', icon: IoSettings, label: 'Settings', color: 'text-purple-400' },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.path}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link 
                              to={item.path}
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 transition-all group"
                            >
                              <Icon className={`text-xl ${item.color} group-hover:scale-110 transition-transform`} />
                              <span className="font-medium group-hover:text-white">{item.label}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Logout Button */}
                    <div className="border-t border-gray-700/50 p-2">
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all group"
                      >
                        <IoLogOut className="text-xl group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
