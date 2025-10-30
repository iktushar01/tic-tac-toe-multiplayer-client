import { 
  IoPersonAdd,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoGameController,
  IoTrophy,
  IoStatsChart
} from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useState } from 'react';

const UserCard = ({ 
  user, 
  isFriend = false, 
  isSentRequest = false, 
  isReceivedRequest = false,
  onSendRequest,
  onAcceptRequest,
  onRejectRequest,
  onCancelRequest,
  onChallenge,
  onUnfriend
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // Determine card theme colors
  const getThemeColors = () => {
    if (isSentRequest) {
      return {
        gradient: 'from-orange-500 to-amber-600',
        border: 'border-orange-500/30',
        hoverBorder: 'group-hover:border-orange-500',
        glow: 'from-orange-500/20 to-amber-500/20',
        accent: 'from-orange-500/20'
      };
    }
    if (isReceivedRequest) {
      return {
        gradient: 'from-blue-500 to-cyan-600',
        border: 'border-blue-500/30',
        hoverBorder: 'group-hover:border-blue-500',
        glow: 'from-blue-500/20 to-cyan-500/20',
        accent: 'from-blue-500/20'
      };
    }
    return {
      gradient: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/30',
      hoverBorder: 'group-hover:border-cyan-500',
      glow: 'from-cyan-500/20 to-blue-500/20',
      accent: 'from-cyan-500/20'
    };
  };

  const colors = getThemeColors();

  const renderAvatar = () => {
    const avatarGradient = isSentRequest 
      ? 'from-orange-400 to-amber-600'
      : isReceivedRequest
      ? 'from-blue-400 to-cyan-600'
      : 'from-cyan-400 to-blue-600';

    if (user.photoURL) {
      return (
        <motion.img 
          src={user.photoURL} 
          alt={user.username}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-${isSentRequest ? 'orange' : isReceivedRequest ? 'blue' : 'cyan'}-500/50 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
        />
      );
    }
    
    return (
      <motion.div 
        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${avatarGradient} rounded-full flex items-center justify-center ring-2 ring-${isSentRequest ? 'orange' : isReceivedRequest ? 'blue' : 'cyan'}-500/50 shadow-lg shadow-${isSentRequest ? 'orange' : isReceivedRequest ? 'blue' : 'cyan'}-500/30`}
        whileHover={{ scale: 1.1, rotate: -5 }}
      >
        <span className="text-white font-black text-xl sm:text-2xl">
          {user.username.charAt(0).toUpperCase()}
        </span>
      </motion.div>
    );
  };

  const renderActionButton = () => {
    if (isFriend) {
      return (
        <div className="flex gap-2">
          <motion.button
            onClick={() => onChallenge(user.userId)}
            className="relative flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 px-4 rounded-xl font-bold transition-all shadow-lg shadow-green-500/30 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
              <IoGameController className="text-base sm:text-lg" />
              Challenge
            </span>
            <motion.div
              className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <motion.button
            onClick={() => onUnfriend(user.userId)}
            className="relative flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2.5 px-4 rounded-xl font-bold transition-all shadow-lg shadow-red-500/30 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
              <IoCloseCircle className="text-base sm:text-lg" />
              Unfriend
            </span>
            <motion.div
              className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      );
    }

    if (isSentRequest) {
      return (
        <motion.button
          onClick={() => onCancelRequest(user.userId)}
          className="relative w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-2.5 sm:py-3 px-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
            <IoCloseCircle className="text-base sm:text-lg" />
            Cancel Request
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>
      );
    }

    if (isReceivedRequest) {
      return (
        <div className="flex gap-2">
          <motion.button
            onClick={() => onAcceptRequest(user.userId)}
            className="relative flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 px-4 rounded-xl font-bold transition-all shadow-lg shadow-green-500/30 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
              <IoCheckmarkCircle className="text-base sm:text-lg" />
              Accept
            </span>
            <motion.div
              className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <motion.button
            onClick={() => onRejectRequest(user.userId)}
            className="relative flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2.5 px-4 rounded-xl font-bold transition-all shadow-lg shadow-red-500/30 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
              <IoCloseCircle className="text-base sm:text-lg" />
              Reject
            </span>
            <motion.div
              className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      );
    }

    return (
      <motion.button
        onClick={() => onSendRequest(user.userId)}
        className="relative w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/30 overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
          <IoPersonAdd className="text-base sm:text-lg" />
          Send Friend Request
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Outer Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colors.glow} rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
      />

      {/* Main Card */}
      <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${colors.border} ${colors.hoverBorder} rounded-xl p-3 sm:p-4 transition-all duration-300 overflow-hidden shadow-xl`}>
        {/* Animated Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
          animate={isHovered ? { x: ['-100%', '200%'] } : {}}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
        />

        {/* Corner Accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${colors.accent} to-transparent rounded-bl-full`} />

        {/* Status Badge */}
        {(isSentRequest || isReceivedRequest) && (
          <motion.div 
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
              isSentRequest 
                ? 'bg-orange-500/20 border border-orange-500/50 text-orange-400'
                : 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            {isSentRequest ? '⏳ Pending' : '📩 Request'}
          </motion.div>
        )}

        {/* Card Content */}
        <div className="relative z-10">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            {renderAvatar()}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-sm sm:text-base truncate">{user.username}</h3>
              <p className="text-xs sm:text-sm text-gray-400 truncate">{user.email}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-2 mb-3">
            <motion.div 
              className="flex-1 bg-gray-900/50 rounded-lg px-2 sm:px-3 py-2 border border-green-500/20 group/stat"
              whileHover={{ scale: 1.05, borderColor: 'rgba(34, 197, 94, 0.5)' }}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <IoTrophy className="text-green-400 text-sm sm:text-base group-hover/stat:animate-bounce" />
                <span className="text-green-400 font-bold text-xs sm:text-sm">{user.stats?.wins || 0}</span>
              </div>
              <p className="text-gray-500 text-[10px] sm:text-xs text-center mt-0.5">Wins</p>
            </motion.div>
            
            <motion.div 
              className="flex-1 bg-gray-900/50 rounded-lg px-2 sm:px-3 py-2 border border-cyan-500/20 group/stat"
              whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <IoStatsChart className="text-cyan-400 text-sm sm:text-base group-hover/stat:animate-pulse" />
                <span className="text-cyan-400 font-bold text-xs sm:text-sm">{user.stats?.winRate || 0}%</span>
              </div>
              <p className="text-gray-500 text-[10px] sm:text-xs text-center mt-0.5">Rate</p>
            </motion.div>
          </div>

          {/* Action Button */}
          {renderActionButton()}
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;

