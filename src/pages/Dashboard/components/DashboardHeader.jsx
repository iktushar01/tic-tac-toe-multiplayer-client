import { motion } from 'framer-motion';
import { IoStatsChart, IoRefresh } from 'react-icons/io5';

const DashboardHeader = ({ onRefresh }) => {
  return (
    <motion.div 
      className="mb-6 sm:mb-8 text-center sm:text-left"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-cyan-500/20 rounded-lg">
            <IoStatsChart className="text-3xl sm:text-4xl text-cyan-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 sm:p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          title="Refresh"
        >
          <IoRefresh className="text-gray-300 text-lg sm:text-xl" />
        </button>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-gray-400 px-2 sm:px-0">
        Manage your friends and view your game statistics.
      </p>
    </motion.div>
  );
};

export default DashboardHeader;

