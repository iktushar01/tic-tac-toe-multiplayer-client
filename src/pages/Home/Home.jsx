import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { apiService } from '../../services/api';
import { 
  IoGameController, 
  IoPeople, 
  IoDesktop, 
  IoEnter,
  IoTrophy,
  IoFlash,
  IoRocket,
  IoShield,
  IoSparkles,
  IoGrid
} from 'react-icons/io5';
import { 
  BsFire, 
  BsStars, 
  BsLightningChargeFill,
  BsController
} from 'react-icons/bs';
import { 
  FaCrown,
  FaGamepad,
  FaDice
} from 'react-icons/fa';
import { 
  GiCrossedSwords,
  GiTrophyCup,
  GiBrain
} from 'react-icons/gi';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Floating particles component
const FloatingParticle = ({ delay = 0, duration = 20, size = 4 }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-20`}
    style={{
      width: size,
      height: size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, Math.random() * 20 - 10, 0],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

// Gaming Grid Background
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="rgba(6, 182, 212, 0.1)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
      animate={{
        y: ['-100%', '100%']
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Memoized handlers
  const handleMultiplayer = useCallback(() => {
    Swal.fire({
      title: '🚧 Features Coming Soon',
      text: 'Multiplayer mode is under development. Stay tuned!',
      icon: 'info',
      confirmButtonColor: '#06b6d4',
      confirmButtonText: 'Got it!',
      background: '#1f2937',
      color: '#fff',
      customClass: {
        popup: 'border border-cyan-500/30 shadow-2xl shadow-cyan-500/20',
        confirmButton: 'bg-cyan-500 hover:bg-cyan-600 transition-all'
      }
    });
  }, []);

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
    Swal.fire({
      title: '🚧 Features Coming Soon',
      text: 'Custom room feature is under development. Stay tuned!',
      icon: 'info',
      confirmButtonColor: '#10b981',
      confirmButtonText: 'Got it!',
      background: '#1f2937',
      color: '#fff',
      customClass: {
        popup: 'border border-green-500/30 shadow-2xl shadow-green-500/20',
        confirmButton: 'bg-green-500 hover:bg-green-600 transition-all'
      }
    });
  }, []);

  const features = [
    {
      icon: GiBrain,
      title: "AI Opponent",
      description: "Challenge our smart AI",
      color: "from-purple-500 to-pink-500",
      delay: 0
    },
    {
      icon: GiCrossedSwords,
      title: "Battle Mode",
      description: "Compete with friends",
      color: "from-orange-500 to-red-500",
      delay: 0.1
    },
    {
      icon: GiTrophyCup,
      title: "Win Rewards",
      description: "Earn coins & glory",
      color: "from-yellow-500 to-orange-500",
      delay: 0.2
    },
    {
      icon: IoRocket,
      title: "Fast Paced",
      description: "Quick matches",
      color: "from-cyan-500 to-blue-500",
      delay: 0.3
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid Background */}
      <GridBackground />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} duration={15 + i * 2} size={3 + Math.random() * 5} />
      ))}
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden pt-20 sm:pt-24"
      >
        {/* Animated Glow Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-[120px] bg-cyan-500/30"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[120px] bg-purple-500/30"
          animate={{ 
            scale: [1, 1.4, 1],
            x: [0, -60, 0],
            y: [0, 60, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-[120px] bg-pink-500/20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Hero Content */}
          <div className="text-center max-w-6xl mx-auto mb-12 sm:mb-16">
            {/* Epic Gaming Icon */}
            <motion.div 
              className="mb-8 flex justify-center relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            >
              <motion.div 
                className="relative"
                animate={{ 
                  y: [0, -15, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ 
                    boxShadow: [
                      '0 0 60px 20px rgba(6, 182, 212, 0.4)',
                      '0 0 80px 30px rgba(168, 85, 247, 0.4)',
                      '0 0 60px 20px rgba(6, 182, 212, 0.4)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Main Icon */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 sm:p-12 rounded-3xl border-4 border-cyan-500/30 shadow-2xl">
                  <IoGameController className="text-7xl sm:text-8xl md:text-9xl text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text" />
                  
                  {/* Rotating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 sm:p-4 rounded-full shadow-xl">
                      <BsLightningChargeFill className="text-2xl sm:text-3xl text-white" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6"
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.3, 1]
                  }}
                    transition={{ 
                      rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2.5, repeat: Infinity }
                    }}
                >
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 sm:p-4 rounded-full shadow-xl">
                      <FaCrown className="text-2xl sm:text-3xl text-yellow-300" />
                    </div>
                </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Epic Title with Glitch Effect */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6 relative"
            >
            <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 relative"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                X-O ARENA
              </motion.h1>
              
              {/* Glitch Shadow Effect */}
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black absolute top-0 left-0 w-full opacity-30 pointer-events-none"
                style={{
                  color: '#06b6d4',
                  textShadow: '-2px 0 #ec4899, 2px 0 #06b6d4'
                }}
                animate={{
                  x: [-2, 2, -2],
                  opacity: [0.3, 0.2, 0.3]
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
            >
                X-O ARENA
            </motion.h1>
            </motion.div>
            
            {/* Subtitle with Icons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <IoSparkles className="text-yellow-400 text-xl sm:text-2xl" />
              </motion.div>
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 font-medium">
                The Ultimate <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text font-bold">Tic-Tac-Toe</span> Battle Arena
              </p>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <IoFlash className="text-purple-400 text-xl sm:text-2xl" />
              </motion.div>
            </motion.div>
            
            {/* Game Mode Cards */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Multiplayer Card */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setHoveredCard('multiplayer')}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group cursor-pointer"
                onClick={handleMultiplayer}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  animate={hoveredCard === 'multiplayer' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: hoveredCard === 'multiplayer' ? Infinity : 0 }}
                />
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8 rounded-2xl border-2 border-cyan-500/30 group-hover:border-cyan-500 transition-all duration-300 overflow-hidden">
                  {/* Animated Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)',
                    }}
                    animate={hoveredCard === 'multiplayer' ? { x: ['-100%', '100%'] } : {}}
                    transition={{ duration: 1.5, repeat: hoveredCard === 'multiplayer' ? Infinity : 0 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      className="mb-4 flex justify-center"
                      animate={hoveredCard === 'multiplayer' ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                        <IoPeople className="text-4xl sm:text-5xl text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
                      Multiplayer
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Battle against players worldwide
                    </p>
                    
                    {/* Status Badge */}
                    <div className="mt-4 inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs sm:text-sm text-cyan-400 font-semibold">
                      Coming Soon
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Computer Mode Card (Featured) */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setHoveredCard('computer')}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group cursor-pointer sm:col-span-2 lg:col-span-1"
                onClick={handleComputerMode}
              >
                {/* Featured Badge */}
                <motion.div
                  className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full shadow-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
              >
                  <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                    <IoTrophy className="text-base" /> HOT
                  </span>
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  animate={hoveredCard === 'computer' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: hoveredCard === 'computer' ? Infinity : 0 }}
                />
                <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-800 p-6 sm:p-8 rounded-2xl border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300 overflow-hidden">
                  {/* Animated Scan Line */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.3), transparent)',
                    }}
                    animate={hoveredCard === 'computer' ? { y: ['-100%', '100%'] } : {}}
                    transition={{ duration: 2, repeat: hoveredCard === 'computer' ? Infinity : 0 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      className="mb-4 flex justify-center"
                      animate={hoveredCard === 'computer' ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: hoveredCard === 'computer' ? Infinity : 0 }}
                    >
                      <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl relative">
                        <IoDesktop className="text-4xl sm:text-5xl text-white" />
                        {loading && (
                          <motion.div
                            className="absolute inset-0 rounded-xl border-4 border-white/50"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </div>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
                      AI Challenge
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Test your skills against smart AI
                    </p>
                    
                    {/* CTA */}
                    <motion.div 
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs sm:text-sm text-white font-bold shadow-lg"
                      animate={{ boxShadow: ['0 0 20px rgba(168, 85, 247, 0.5)', '0 0 30px rgba(236, 72, 153, 0.7)', '0 0 20px rgba(168, 85, 247, 0.5)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <BsFire className="text-base" />
                      {loading ? 'Starting...' : 'Play Now!'}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Custom Room Card */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setHoveredCard('custom')}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group cursor-pointer"
                onClick={handleCustomRoom}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  animate={hoveredCard === 'custom' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: hoveredCard === 'custom' ? Infinity : 0 }}
                />
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8 rounded-2xl border-2 border-green-500/30 group-hover:border-green-500 transition-all duration-300 overflow-hidden">
                  {/* Particle Effect */}
                  <AnimatePresence>
                    {hoveredCard === 'custom' && (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-green-400 rounded-full"
                            initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              x: [0, (Math.random() - 0.5) * 200],
                              y: [0, (Math.random() - 0.5) * 200],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                  
                  <div className="relative z-10">
                    <motion.div
                      className="mb-4 flex justify-center"
                      animate={hoveredCard === 'custom' ? { rotate: [0, 15, -15, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                        <IoEnter className="text-4xl sm:text-5xl text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
                      Custom Room
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Create private matches with friends
                    </p>
                    
                    {/* Status Badge */}
                    <div className="mt-4 inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs sm:text-sm text-green-400 font-semibold">
                      Coming Soon
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + feature.delay }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  className="relative group"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-4 sm:p-6 rounded-xl text-center hover:border-cyan-500/50 transition-all duration-300">
                    <motion.div
                      className={`mb-3 flex justify-center`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-lg`}>
                        <Icon className="text-2xl sm:text-3xl text-white" />
                      </div>
                    </motion.div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center gap-2"
            >
              <p className="text-gray-400 text-sm sm:text-base font-medium">Ready to dominate?</p>
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <IoShield className="text-3xl sm:text-4xl text-cyan-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;

