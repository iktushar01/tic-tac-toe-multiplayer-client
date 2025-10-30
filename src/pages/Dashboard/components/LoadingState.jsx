import { motion } from 'framer-motion';
import { IoGameController } from 'react-icons/io5';

const LoadingState = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 text-center">
        {/* Animated Gaming Icon */}
        <motion.div
          className="mb-8"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-60"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <IoGameController className="relative text-6xl sm:text-7xl text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text" />
          </div>
        </motion.div>

        {/* Spinning Loader */}
        <div className="relative inline-block mb-6">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-800"
            style={{
              borderTopColor: '#06b6d4',
              borderRightColor: '#8b5cf6',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Loading Text */}
        <motion.p 
          className="text-gray-300 text-lg sm:text-xl font-semibold mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Dashboard
        </motion.p>
        
        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;

