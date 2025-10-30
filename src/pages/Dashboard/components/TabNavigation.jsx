import { IoPeople, IoPersonAdd } from 'react-icons/io5';
import { BsPeopleFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

const TabNavigation = ({ activeTab, onTabChange, receivedRequestsCount }) => {
  const tabs = [
    { id: 'friends', label: 'Friends', icon: BsPeopleFill, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'users', label: 'All Users', icon: IoPeople, gradient: 'from-purple-500 to-pink-500' },
    { id: 'requests', label: 'Friend Requests', icon: IoPersonAdd, gradient: 'from-orange-500 to-red-500' }
  ];

  return (
    <motion.div 
      className="mb-6 sm:mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="relative bg-gray-900/50 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl border border-gray-700/50 shadow-2xl">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-xl blur-xl" />
        
        <div className="relative flex flex-col sm:flex-row gap-1.5 sm:gap-2">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex-1 flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: isActive ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-lg`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover Background */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gray-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                
                {/* Shine Effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
                
                {/* Icon & Text */}
                <motion.div
                  className="relative z-10"
                  animate={isActive ? { rotate: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`text-lg sm:text-xl ${isActive ? 'drop-shadow-lg' : ''}`} />
                </motion.div>
                <span className={`relative z-10 text-sm sm:text-base font-semibold hidden sm:inline ${isActive ? 'drop-shadow-lg' : ''}`}>
                  {tab.label}
                </span>
                
                {/* Notification Badge */}
                {tab.id === 'requests' && receivedRequestsCount > 0 && (
                  <motion.span 
                    className="relative z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 sm:py-1 rounded-full shadow-lg shadow-red-500/50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {receivedRequestsCount}
                  </motion.span>
                )}
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TabNavigation;

