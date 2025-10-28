import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import PlayerCard from './PlayerCard';
import MatchCard from './MatchCard';
import { apiService } from '../../services/api';
import { IoGameController, IoFlash, IoPeople, IoTime, IoDesktop, IoEnter } from 'react-icons/io5';
import { BsFire, BsCheckCircleFill, BsStars } from 'react-icons/bs';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
};

const transition = { duration: 0.6 };

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Sample data - memoized
  const onlinePlayers = [
    { id: 1, username: 'Player2', online: true },
    { id: 2, username: 'Player3', online: true },
    { id: 3, username: 'Player4', online: true },
    { id: 4, username: 'Player5', online: false },
    { id: 5, username: 'Player6', online: true },
  ];

  const recentMatches = [
    {
      id: '1',
      opponent: 'Player2',
      result: 'Win',
      date: new Date().toISOString(),
      moves: 9,
    },
    {
      id: '2',
      opponent: 'Player3',
      result: 'Loss',
      date: new Date(Date.now() - 86400000).toISOString(),
      moves: 7,
    },
    {
      id: '3',
      opponent: 'Player4',
      result: 'Draw',
      date: new Date(Date.now() - 172800000).toISOString(),
      moves: 9,
    },
  ];

  const onlineCount = onlinePlayers.filter(p => p.online).length;

  // Memoized handlers
  const handleMultiplayer = useCallback(async () => {
    setLoading(true);
    try {
      const game = await apiService.quickMatch();
      navigate(`/game/multiplayer/${game.gameId}`);
    } catch (err) {
      console.error('Error finding match:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleComputerMode = useCallback(async () => {
    setLoading(true);
    try {
      // For AI mode, we'll create a special game with AI
      const game = await apiService.createGame();
      navigate(`/game/computer/${game.gameId}`, { state: { aiMode: true, roomCode: game.roomCode } });
    } catch (err) {
      console.error('Error creating AI game:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleCustomRoom = useCallback(() => {
    navigate('/game/room-selector');
  }, [navigate]);

  return (
    <div className="min-h-screen  bg-gray-900">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero  from-gray-900 via-gray-800 to-gray-700 backdrop-blur-md text-white py-12 sm:py-20 relative overflow-hidden shadow-2xl"
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            background: [
              'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1), transparent 50%)',
              'radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.15), transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.15), transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1), transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl bg-cyan-500 opacity-40"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full blur-3xl bg-purple-500 opacity-40"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="hero-content text-center py-8 sm:py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Icon */}
            <motion.div 
              className="mb-4 sm:mb-6 flex justify-center"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="relative"
                animate={{ 
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <IoGameController className="text-5xl sm:text-8xl text-cyan-400" />
                <motion.div
                  className="absolute -top-2 -right-2 text-yellow-400 text-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <BsFire />
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Animated Title */}
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                scale: { duration: 0.8 },
                opacity: { duration: 0.8 },
                backgroundPosition: { duration: 3, repeat: Infinity }
              }}
            >
              Welcome to X-O Arena
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-300 max-w-2xl mx-auto px-4 flex items-center justify-center gap-2"
              initial={fadeInUp.hidden}
              animate={fadeInUp.visible}
              transition={{ ...transition, delay: 0.3 }}
            >
              <BsStars className="text-yellow-400 text-lg" />
              Challenge players worldwide in the ultimate Tic Tac Toe multiplayer experience!
              <BsStars className="text-yellow-400 text-lg" />
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-2xl w-full sm:w-auto sm:min-w-[200px] group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleMultiplayer}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                ) : (
                  <>
                    <IoPeople className="text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                    <span>Multiplayer</span>
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold group transition-all shadow-xl w-full sm:w-auto sm:min-w-[200px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleComputerMode}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                ) : (
                  <>
                    <IoDesktop className="text-xl sm:text-2xl group-hover:animate-pulse" />
                    <span>Computer Mode</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold group transition-all shadow-xl w-full sm:w-auto sm:min-w-[200px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCustomRoom}
              >
                <IoEnter className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform" />
                <span>Custom Room</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Online Players */}
          <motion.section 
            className="bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow border border-gray-700 rounded-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-700">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <IoPeople className="text-3xl text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-400">Online Players</h2>
                <motion.div 
                  className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold ml-auto"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BsCheckCircleFill className="mr-1 inline-block" />
                  {onlineCount} online
                </motion.div>
              </div>
              <div className="space-y-3">
                {onlinePlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={fadeInLeft.hidden}
                    animate={fadeInLeft.visible}
                    transition={{ ...transition, delay: 1.1 + index * 0.1 }}
                  >
                    <PlayerCard
                      player={player}
                      online={player.online}
                      onChallenge={(p) => console.log('Challenge', p)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Recent Matches */}
          <motion.section 
            className="bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow border border-gray-700 rounded-lg"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-700">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <IoTime className="text-3xl text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-purple-400">Recent Matches</h2>
              </div>
              <div className="space-y-3">
                {recentMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={fadeInRight.hidden}
                    animate={fadeInRight.visible}
                    transition={{ ...transition, delay: 1.1 + index * 0.1 }}
                  >
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;

