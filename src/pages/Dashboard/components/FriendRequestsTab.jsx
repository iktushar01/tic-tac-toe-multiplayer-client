import { motion } from 'framer-motion';
import { IoPersonAdd, IoMail, IoNotifications } from 'react-icons/io5';
import UserCard from './UserCard';

const FriendRequestsTab = ({ 
  receivedRequests, 
  onAcceptRequest,
  onRejectRequest 
}) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-2xl overflow-hidden shadow-2xl">
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="requestsTabGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#requestsTabGrid)" />
        </svg>
      </div>

      {/* Animated Glow Effect */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text mb-2 flex items-center gap-2 sm:gap-3">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <IoPersonAdd className="text-orange-400 text-2xl sm:text-3xl" />
            </motion.div>
            Friend Requests
            {receivedRequests.length > 0 && (
              <motion.div
                className="bg-orange-500/20 border border-orange-500/50 rounded-full px-3 py-1"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: ['0 0 0px rgba(249, 115, 22, 0)', '0 0 20px rgba(249, 115, 22, 0.5)', '0 0 0px rgba(249, 115, 22, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-orange-400 font-bold text-base sm:text-lg">{receivedRequests.length}</span>
              </motion.div>
            )}
            <motion.div
              animate={{ 
                rotate: [0, -15, 15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <IoNotifications className="text-red-400 text-lg sm:text-xl" />
            </motion.div>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">Respond to incoming friend requests</p>
        </motion.div>

        {receivedRequests.length === 0 ? (
          <motion.div 
            className="text-center py-12 sm:py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div 
              className="text-5xl sm:text-6xl mb-4"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📬
            </motion.div>
            <p className="text-gray-400 text-base sm:text-lg font-medium mb-2">All caught up!</p>
            <p className="text-gray-500 text-xs sm:text-sm">No pending friend requests at the moment.</p>
            
            {/* Decorative Elements */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-orange-400 rounded-full"
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {receivedRequests.map((request, index) => (
              <motion.div
                key={request.userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <UserCard
                  user={request}
                  isReceivedRequest={true}
                  onAcceptRequest={onAcceptRequest}
                  onRejectRequest={onRejectRequest}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequestsTab;

