import { motion } from 'framer-motion';
import { IoPeople, IoSparkles } from 'react-icons/io5';
import UserCard from './UserCard';

const UsersTab = ({ 
  allUsers, 
  friends, 
  sentRequests, 
  receivedRequests,
  onSendRequest,
  onAcceptRequest,
  onRejectRequest,
  onCancelRequest
}) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl">
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="usersTabGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#usersTabGrid)" />
        </svg>
      </div>

      {/* Animated Glow Effect */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text mb-2 flex items-center gap-2 sm:gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <IoPeople className="text-cyan-400 text-2xl sm:text-3xl" />
            </motion.div>
            All Users
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <IoSparkles className="text-yellow-400 text-lg sm:text-xl" />
            </motion.div>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">Connect with players from around the world</p>
        </motion.div>

        {allUsers.length === 0 ? (
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
              👥
            </motion.div>
            <p className="text-gray-400 text-base sm:text-lg font-medium">No other users found.</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">Check back later for new players!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {allUsers.map((user) => {
              const isFriend = friends.some(f => f.userId === user.userId);
              const isSentRequest = sentRequests.some(r => r.userId === user.userId);
              const isReceivedRequest = receivedRequests.some(r => r.userId === user.userId);

              // If user is already a friend, show disabled state with gaming style
              if (isFriend) {
                return (
                  <motion.div 
                    key={user.userId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500/30 rounded-xl p-3 sm:p-4 overflow-hidden">
                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-full" />
                      
                      {/* Success Badge */}
                      <div className="absolute top-2 right-2 bg-green-500/20 border border-green-500/50 rounded-full px-2 py-1">
                        <span className="text-green-400 text-xs font-bold">✓ Friend</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3 relative z-10">
                        {user.photoURL ? (
                          <motion.img 
                            src={user.photoURL} 
                            alt={user.username}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-green-500/50"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          />
                        ) : (
                          <motion.div 
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center ring-2 ring-green-500/50 shadow-lg shadow-green-500/30"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                          >
                            <span className="text-white font-bold text-lg sm:text-xl">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </motion.div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-sm sm:text-base truncate">{user.username}</h3>
                          <p className="text-xs sm:text-sm text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs sm:text-sm mb-3 bg-gray-900/50 rounded-lg px-3 py-2">
                        <span className="text-green-400 font-bold">🏆 {user.stats?.wins || 0} Wins</span>
                        <span className="text-cyan-400 font-bold">📊 {user.stats?.winRate || 0}%</span>
                      </div>
                      
                      <button
                        disabled
                        className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 py-2 sm:py-2.5 px-4 rounded-lg cursor-not-allowed border border-gray-600 font-semibold text-xs sm:text-sm"
                      >
                        ✓ Already Friends
                      </button>
                    </div>
                  </motion.div>
                );
              }

              return (
                <UserCard
                  key={user.userId}
                  user={user}
                  isFriend={false}
                  isSentRequest={isSentRequest}
                  isReceivedRequest={isReceivedRequest}
                  onSendRequest={onSendRequest}
                  onAcceptRequest={onAcceptRequest}
                  onRejectRequest={onRejectRequest}
                  onCancelRequest={onCancelRequest}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTab;

