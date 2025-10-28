import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlayerCard from '../components/PlayerCard';
import MatchCard from '../components/MatchCard';
import { apiService } from '../services/api';
import { IoGameController, IoFlash, IoAddCircle, IoPeople, IoTime } from 'react-icons/io5';
import { BsTrophy, BsFire, BsCheckCircleFill } from 'react-icons/bs';

const Home = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample data
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

  const handleCreateGame = async () => {
    setLoading(true);
    try {
      const game = await apiService.createGame();
      navigate(`/game/${game.gameId}`, { state: { roomCode: game.roomCode } });
    } catch (err) {
      console.error('Error creating game:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!roomCode) {
      alert('Please enter a room code');
      return;
    }
    setLoading(true);
    try {
      const game = await apiService.joinGame(roomCode);
      navigate(`/game/${game.gameId}`, { state: { roomCode: game.roomCode } });
    } catch (err) {
      alert('Invalid room code');
      console.error('Join game error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMatch = async () => {
    setLoading(true);
    try {
      const game = await apiService.quickMatch();
      navigate(`/game/${game.gameId}`);
    } catch (err) {
      console.error('Error finding match:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-900">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 backdrop-blur-md text-white py-20 relative overflow-hidden shadow-2xl"
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            background: [
              'radial-gradient(circle at 50% 50%, rgba(var(--p), 0.1), transparent 50%)',
              'radial-gradient(circle at 30% 30%, rgba(var(--s), 0.15), transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(var(--p), 0.15), transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(var(--p), 0.1), transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl bg-primary opacity-40"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full blur-3xl bg-secondary opacity-40"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="hero-content text-center py-16 relative z-10">
          <div className="max-w-4xl">
            {/* Icon */}
            <motion.div 
              className="mb-6 flex justify-center"
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
                <IoGameController className="text-8xl text-cyan-400" />
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
              className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto]"
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
              className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Challenge players worldwide in the ultimate Tic Tac Toe multiplayer experience!
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-2xl min-w-[200px] group"
                onClick={handleCreateGame}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <IoAddCircle className="text-2xl group-hover:rotate-90 transition-transform" />
                    Create Game
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold group transition-all shadow-xl min-w-[200px]"
                onClick={handleQuickMatch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                  </>
                ) : (
                  <>
                    <IoFlash className="text-2xl group-hover:animate-pulse" />
                    Quick Match
                  </>
                )}
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
        {/* Join Game Section */}
        <section className="mb-12">
          <motion.div 
            className="card shadow-2xl bg-gray-800 border border-gray-700 hover:border-cyan-500/50 transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="p-8">
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <IoGameController className="text-4xl text-cyan-400" />
                <h2 className="text-3xl font-bold text-cyan-400">
                  Join a Game
                </h2>
              </motion.div>
              
              <div>
                <label className="text-lg font-semibold flex items-center gap-2 mb-2 text-gray-300">
                  <BsTrophy className="text-yellow-400" />
                  Enter Room Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter 4-digit code"
                    className="px-4 py-3 w-full text-lg bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    maxLength={4}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-cyan-500/50"
                    onClick={handleJoinGame}
                    disabled={loading || !roomCode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        Join Game
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Online Players */}
          <motion.section 
            className="bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow border border-gray-700 rounded-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-700">
                <IoPeople className="text-3xl text-cyan-400" />
                <h2 className="text-2xl font-bold text-cyan-400">Online Players</h2>
                <motion.div 
                  className="badge bg-green-500 text-white ml-auto"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BsCheckCircleFill className="mr-1" />
                  {onlinePlayers.filter(p => p.online).length} online
                </motion.div>
              </div>
              <div className="space-y-3">
                {onlinePlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
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
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-700">
                <IoTime className="text-3xl text-purple-400" />
                <h2 className="text-2xl font-bold text-purple-400">Recent Matches</h2>
              </div>
              <div className="space-y-3">
                {recentMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
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

