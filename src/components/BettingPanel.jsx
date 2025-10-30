import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCash, IoTrophy, IoClose, IoCheckmark, IoWarning } from 'react-icons/io5';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

/**
 * BettingPanel Component
 * Displays betting UI for coin-based games
 */
const BettingPanel = ({ 
  onBetPlaced, 
  onCancel, 
  gameId = null,
  disabled = false 
}) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [coinStats, setCoinStats] = useState(null);
  const [selectedBet, setSelectedBet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  const BET_OPTIONS = [100, 200, 500, 1000, 2000];
  const MIN_BET = 100;

  useEffect(() => {
    loadCoinBalance();
  }, []);

  const loadCoinBalance = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCurrentUser();
      setBalance(data.user.coins || 0);
      setCoinStats(data.user.coinStats || null);
      setError(null);
    } catch (err) {
      console.error('Error loading coin balance:', err);
      setError('Failed to load coin balance');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBet = (amount) => {
    if (balance >= amount && !disabled) {
      setSelectedBet(amount);
      setError(null);
    } else if (balance < amount) {
      setError(`Not enough coins. You need ${amount} but only have ${balance}.`);
    }
  };

  const handlePlaceBet = async () => {
    if (!selectedBet) {
      setError('Please select a bet amount');
      return;
    }

    try {
      setIsPlacingBet(true);
      setError(null);
      
      const response = await apiService.placeBet(selectedBet, gameId);
      
      if (response.success) {
        onBetPlaced(selectedBet);
      } else {
        setError(response.error || 'Failed to place bet');
      }
    } catch (err) {
      console.error('Error placing bet:', err);
      setError(err.message || 'Failed to place bet');
    } finally {
      setIsPlacingBet(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-cyan-500"></div>
        </div>
      </div>
    );
  }

  const availableBets = BET_OPTIONS.filter(bet => balance >= bet);
  const canPlay = balance >= MIN_BET;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-5 md:p-6 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex-shrink-0">
            <IoCash className="text-xl sm:text-2xl text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">Place Your Bet</h2>
            <p className="text-gray-400 text-xs sm:text-sm">Choose your wager to start</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
        >
          <IoClose className="text-xl sm:text-2xl text-gray-400 hover:text-white" />
        </button>
      </div>

      {/* Balance Display */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 shadow-lg"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-xs sm:text-sm font-semibold">Your Balance</p>
            <p className="text-white text-2xl sm:text-3xl font-bold flex items-center gap-1 sm:gap-2">
              <IoCash className="text-xl sm:text-2xl flex-shrink-0" />
              <span className="truncate">{balance.toLocaleString()}</span>
            </p>
          </div>
          {coinStats && (
            <div className="text-right flex-shrink-0">
              <p className="text-white/80 text-xs">Games Played</p>
              <p className="text-white text-lg sm:text-xl font-bold">{coinStats.gamesPlayed}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4 flex items-start gap-3"
          >
            <IoWarning className="text-red-400 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Not Enough Coins */}
      {!canPlay ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="text-6xl mb-4">💸</div>
          <h3 className="text-xl font-bold text-white mb-2">Not Enough Coins!</h3>
          <p className="text-gray-400 mb-4">
            You need at least {MIN_BET} coins to play.
          </p>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      ) : (
        <>
          {/* Bet Options */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
              <IoTrophy className="text-yellow-400 flex-shrink-0" />
              <span>Select Bet Amount</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {BET_OPTIONS.map((bet, index) => {
                const canAfford = balance >= bet;
                const isSelected = selectedBet === bet;
                
                return (
                  <motion.button
                    key={bet}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectBet(bet)}
                    disabled={!canAfford || disabled}
                    className={`
                      relative py-4 px-6 rounded-xl font-bold text-lg transition-all
                      ${isSelected 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg scale-105 ring-4 ring-cyan-400/30' 
                        : canAfford
                        ? 'bg-gray-700 text-white hover:bg-gray-600 hover:scale-102'
                        : 'bg-gray-900 text-gray-600 cursor-not-allowed opacity-50'
                      }
                    `}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <IoCash className={isSelected ? 'text-yellow-300' : 'text-gray-400'} />
                      {bet.toLocaleString()}
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                      >
                        <IoCheckmark className="text-white text-sm" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
            {availableBets.length < BET_OPTIONS.length && (
              <p className="text-gray-500 text-xs mt-2 text-center">
                Some bets unavailable due to insufficient balance
              </p>
            )}
          </div>

          {/* Betting Rules */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6"
          >
            <h4 className="text-white font-semibold mb-3 text-sm">💡 Betting Rules:</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-green-400 font-bold">🏆 Win:</span>
                <span className="text-gray-400">Get your bet back + 100% profit (2x total)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">🤝 Draw:</span>
                <span className="text-gray-400">Get 50% of your bet refunded</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-bold">💀 Lose:</span>
                <span className="text-gray-400">Lose your entire bet</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceBet}
              disabled={!selectedBet || isPlacingBet || disabled}
              className={`
                flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
                ${selectedBet && !isPlacingBet && !disabled
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {isPlacingBet ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Placing Bet...
                </>
              ) : (
                <>
                  <IoTrophy />
                  Start Game with {selectedBet ? selectedBet.toLocaleString() : '...'} coins
                </>
              )}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default BettingPanel;

