import { motion } from 'framer-motion';
import { BsPeopleFill } from 'react-icons/bs';
import { IoHeart, IoSparkles } from 'react-icons/io5';
import UserCard from './UserCard';

const FriendsTab = ({ 
  friends, 
  onChallenge,
  onUnfriend 
}) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-2xl overflow-hidden shadow-2xl">
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="friendsTabGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#friendsTabGrid)" />
        </svg>
      </div>

      {/* Animated Glow Effect */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-green-500/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 p-4 sm:p-5 md:p-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text mb-2 flex items-center gap-2 sm:gap-3">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BsPeopleFill className="text-green-400 text-2xl sm:text-3xl" />
            </motion.div>
            Friends
            <motion.div
              className="bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-green-400 font-bold text-base sm:text-lg">{friends.length}</span>
            </motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 20, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <IoHeart className="text-pink-400 text-lg sm:text-xl" />
            </motion.div>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">Your gaming squad ready for battle!</p>
        </motion.div>

        {friends.length === 0 ? (
          <motion.div 
            className="text-center py-12 sm:py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div 
              className="text-5xl sm:text-6xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👫
            </motion.div>
            <p className="text-gray-400 text-base sm:text-lg font-medium mb-2">No friends yet!</p>
            <p className="text-gray-500 text-xs sm:text-sm">Send friend requests to build your squad!</p>
            
            {/* Decorative Elements */}
            <div className="flex justify-center gap-3 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.userId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <UserCard
                  user={friend}
                  isFriend={true}
                  onChallenge={onChallenge}
                  onUnfriend={onUnfriend}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsTab;

