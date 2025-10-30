import { motion } from 'framer-motion';
import { IoCash, IoTrophy, IoClose, IoCheckmark } from 'react-icons/io5';

/**
 * BettingResultModal Component
 * Shows the result of a betting game with coin changes
 */
const BettingResultModal = ({ 
  result, 
  transaction, 
  onClose, 
  onPlayAgain 
}) => {
  if (!transaction) return null;

  const { betAmount, coinChange, profit, balanceAfter, result: gameResult } = transaction;

  const isWin = gameResult === 'win';
  const isDraw = gameResult === 'draw';
  const isLoss = gameResult === 'loss';

  const getResultConfig = () => {
    if (isWin) {
      return {
        emoji: '🏆',
        title: 'You Won!',
        gradient: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500',
      };
    } else if (isDraw) {
      return {
        emoji: '🤝',
        title: 'Draw!',
        gradient: 'from-orange-500 to-yellow-600',
        textColor: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
        borderColor: 'border-orange-500',
      };
    } else {
      return {
        emoji: '💀',
        title: 'You Lost!',
        gradient: 'from-red-500 to-pink-600',
        textColor: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500',
      };
    }
  };

  const config = getResultConfig();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.gradient} p-6 text-center relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <IoClose className="text-2xl text-white" />
          </button>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-7xl mb-3"
          >
            {config.emoji}
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-2"
          >
            {config.title}
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg"
          >
            {result}
          </motion.p>
        </div>

        {/* Stats */}
        <div className="p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-6"
          >
            {/* Bet Amount */}
            <div className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
              <span className="text-gray-400 font-semibold">Bet Amount</span>
              <div className="flex items-center gap-2">
                <IoCash className="text-gray-400" />
                <span className="text-white text-xl font-bold">{betAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Profit/Loss */}
            {isWin && (
              <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <span className="text-green-400 font-semibold">Profit</span>
                <div className="flex items-center gap-2">
                  <IoTrophy className="text-green-400" />
                  <span className="text-green-400 text-xl font-bold">+{profit.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Coin Change */}
            <div className={`flex items-center justify-between ${config.bgColor} border ${config.borderColor} rounded-lg p-4`}>
              <span className={`${config.textColor} font-semibold`}>Coin Change</span>
              <div className="flex items-center gap-2">
                {coinChange >= 0 ? (
                  <IoCheckmark className={config.textColor} />
                ) : (
                  <IoClose className={config.textColor} />
                )}
                <span className={`${config.textColor} text-2xl font-bold`}>
                  {coinChange >= 0 ? '+' : ''}{coinChange.toLocaleString()}
                </span>
              </div>
            </div>

            {/* New Balance */}
            <div className="flex items-center justify-between bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4">
              <span className="text-yellow-400 font-semibold">New Balance</span>
              <div className="flex items-center gap-2">
                <IoCash className="text-yellow-400 text-xl" />
                <span className="text-yellow-400 text-2xl font-bold">{balanceAfter.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={onPlayAgain}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BettingResultModal;

