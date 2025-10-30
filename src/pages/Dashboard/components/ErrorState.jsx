import { motion } from 'framer-motion';
import { IoWarning, IoRefresh } from 'react-icons/io5';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-red-500/20"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-orange-500/20"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 text-center max-w-md mx-auto px-4">
        {/* Error Icon */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 blur-2xl bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-60"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="relative bg-gradient-to-br from-red-500 to-orange-600 p-6 sm:p-8 rounded-2xl border-4 border-red-500/30"
              animate={{ 
                boxShadow: [
                  '0 0 30px rgba(239, 68, 68, 0.3)',
                  '0 0 50px rgba(249, 115, 22, 0.5)',
                  '0 0 30px rgba(239, 68, 68, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <IoWarning className="text-5xl sm:text-6xl text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Title */}
        <motion.h2
          className="text-2xl sm:text-3xl font-black mb-4 text-transparent bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Oops! Something went wrong
        </motion.h2>

        {/* Error Message */}
        <motion.p 
          className="text-gray-300 text-base sm:text-lg mb-8 bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-red-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {error}
        </motion.p>

        {/* Retry Button */}
        <motion.button 
          onClick={onRetry}
          className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {/* Button Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              boxShadow: [
                '0 0 20px rgba(6, 182, 212, 0.5)',
                '0 0 40px rgba(37, 99, 235, 0.7)',
                '0 0 20px rgba(6, 182, 212, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Button Content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <IoRefresh className="text-xl sm:text-2xl" />
            Try Again
          </span>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>

        {/* Help Text */}
        <motion.p
          className="mt-6 text-gray-500 text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          If the problem persists, please refresh the page
        </motion.p>
      </div>
    </div>
  );
};

export default ErrorState;

