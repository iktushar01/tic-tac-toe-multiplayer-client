import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  IoCash, 
  IoTrophy, 
  IoGift, 
  IoTime, 
  IoFlame,
  IoCheckmarkCircle 
} from 'react-icons/io5';
import { apiService } from '../../services/api';
import Swal from 'sweetalert2';

// Reference to satisfy linter for JSX member usage
void motion;

const Inventory = () => {
  const [user, setUser] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [userData, statusData] = await Promise.all([
        apiService.getCurrentUser(),
        apiService.getDailyClaimStatus()
      ]);
      setUser(userData.user);
      setClaimStatus(statusData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleClaimDaily = async () => {
    try {
      setClaiming(true);
      const result = await apiService.claimDailyCoins();
      await Swal.fire({
        title: '🎁 Reward Claimed!',
        html: `
          <div class="text-lg">
            <p class="mb-2"><strong>+${result.reward.totalReward} coins</strong></p>
            ${result.reward.streakBonus > 0 ? `
              <p class="text-sm text-gray-600">Base: ${result.reward.baseReward} + Streak Bonus: ${result.reward.streakBonus}</p>
            ` : ''}
            <p class="text-sm text-gray-600 mt-2">🔥 Streak: ${result.reward.streak} day${result.reward.streak > 1 ? 's' : ''}</p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Awesome!',
        customClass: {
          popup: 'bg-gray-800 text-white',
          title: 'text-white',
          htmlContainer: 'text-gray-300',
        }
      });
      await loadData();
    } catch (error) {
      Swal.fire({
        title: 'Cannot Claim',
        text: error.message || 'Failed to claim daily reward',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'bg-gray-800 text-white',
          title: 'text-white',
          htmlContainer: 'text-gray-300',
        }
      });
    } finally {
      setClaiming(false);
    }
  };

  const getTimeUntilNextClaim = () => {
    if (!claimStatus || !claimStatus.nextClaimTime) return null;
    const now = new Date();
    const next = new Date(claimStatus.nextClaimTime);
    const diff = next - now;
    if (diff <= 0) return '00:00:00';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getStreakRewards = () => {
    return [
      { day: 1, reward: 100, label: 'Day 1' },
      { day: 2, reward: 150, label: 'Day 2' },
      { day: 3, reward: 200, label: 'Day 3' },
      { day: 4, reward: 250, label: 'Day 4' },
      { day: 5, reward: 300, label: 'Day 5' },
      { day: 6, reward: 350, label: 'Day 6' },
      { day: 7, reward: 400, label: 'Day 7+' },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Gaming Grid Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="inventoryGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#inventoryGrid)" />
          </svg>
        </div>
        {/* Glow Orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20"
          animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20"
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500"></div>
        </div>
      </div>
    );
  }

  const streakRewards = getStreakRewards();
  const currentStreak = claimStatus?.streak || 0;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gaming Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="inventoryGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#inventoryGrid)" />
        </svg>
      </div>
      {/* Animated Glow Orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20"
        animate={{ scale: [1, 1.2, 1], x: [0, -60, 0], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20"
        animate={{ scale: [1, 1.3, 1], x: [0, 60, 0], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 min-h-screen py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-2 sm:gap-3">
              <IoCash className="text-yellow-400 text-3xl sm:text-4xl md:text-5xl" />
              <span>Inventory</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4">Manage your coins and claim daily rewards</p>
          </motion.div>

          {/* Coin Balance Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative group bg-linear-to-r from-yellow-500 to-orange-500 rounded-xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-2xl overflow-hidden"
          >
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
            />
            <div className="text-center relative z-10">
              <p className="text-white/80 text-base sm:text-lg font-semibold mb-2">Your Balance</p>
              <motion.div
                key={user?.coins}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center gap-2 sm:gap-3"
              >
                <IoCash className="text-4xl sm:text-5xl text-white" />
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">{user?.coins?.toLocaleString() || 0}</span>
              </motion.div>
              <p className="text-white/70 text-xs sm:text-sm mt-2">coins</p>
            </div>
          </motion.div>

          {/* Daily Claim Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group bg-gray-900/70 border border-cyan-700/40 rounded-xl p-6 mb-8 shadow-xl backdrop-blur overflow-hidden"
          >
            {/* Scanline on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)'
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-cyan-500 to-blue-600 opacity-10 rounded-bl-full" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <IoGift className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Daily Reward</h2>
                <p className="text-gray-400 text-sm">Claim free coins every 24 hours</p>
              </div>
            </div>

            {claimStatus?.canClaim ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClaimDaily}
                disabled={claiming}
                className="relative overflow-hidden w-full py-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Button shine */}
                <motion.span
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-120%', '200%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  {claiming ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Claiming...
                    </>
                  ) : (
                    <>
                      <IoGift className="text-2xl" />
                      Claim {claimStatus.nextReward || 100} Coins
                    </>
                  )}
                </span>
              </motion.button>
            ) : (
              <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 text-center relative z-10">
                <IoTime className="text-5xl text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 mb-2">Come back in</p>
                <p className="text-3xl font-bold text-white mb-2">{getTimeUntilNextClaim()}</p>
                <p className="text-gray-500 text-sm">for your next reward</p>
              </div>
            )}

            {/* Current Streak */}
            <div className="mt-6 bg-gray-900/60 border border-cyan-700/40 rounded-lg p-4 relative z-10 overflow-hidden group/card">
              {/* Shine */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: ['-120%', '200%'] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
              />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <IoFlame className={`text-2xl ${currentStreak > 0 ? 'text-orange-500' : 'text-gray-600'}`} />
                  <span className="text-white font-semibold">Current Streak</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-400">{currentStreak}</p>
                  <p className="text-gray-500 text-xs">day{currentStreak !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Streak Rewards Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group bg-gray-900/70 border border-cyan-700/40 rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 shadow-xl backdrop-blur overflow-hidden"
          >
            {/* Scanline */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 relative z-10">
              <IoTrophy className="text-yellow-400 text-lg sm:text-xl" />
              <span>Streak Rewards</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 relative z-10">
              {streakRewards.map((item) => {
                const isCompleted = currentStreak >= item.day;
                const isCurrent = currentStreak + 1 === item.day || (item.day === 7 && currentStreak >= 7);
                return (
                  <motion.div
                    key={item.day}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`relative group/tile p-3 sm:p-4 rounded-lg text-center transition-all ${
                      isCompleted
                        ? 'bg-linear-to-br from-green-500 to-emerald-600'
                        : isCurrent
                        ? 'bg-linear-to-br from-cyan-500 to-blue-600 ring-2 ring-cyan-400'
                        : 'bg-gray-900/70 border border-gray-700'
                    }`}
                  >
                    {/* Tile shine */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover/tile:opacity-100 pointer-events-none"
                      initial={{ x: '-100%' }}
                      animate={{ x: ['-120%', '200%'] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
                    />
                    {isCompleted && (
                      <div className="absolute top-1 right-1">
                        <IoCheckmarkCircle className="text-white text-sm sm:text-lg" />
                      </div>
                    )}
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 relative z-10">
                      {isCompleted ? '✅' : isCurrent ? '🎯' : '🎁'}
                    </div>
                    <p className={`text-xs sm:text-sm font-semibold mb-1 ${
                      isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                    }`}>
                      {item.label}
                    </p>
                    <p className={`text-base sm:text-lg font-bold ${
                      isCompleted || isCurrent ? 'text-white' : 'text-gray-500'
                    }`}>
                      {item.reward}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-gray-500 text-sm mt-4 text-center relative z-10">
              💡 Claim daily to build your streak and earn more coins!
            </p>
          </motion.div>

          {/* Coin Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group bg-gray-900/70 border border-cyan-700/40 rounded-xl p-4 sm:p-5 md:p-6 shadow-xl backdrop-blur overflow-hidden"
          >
            {/* Scanline */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 relative z-10">Coin Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              <div className="relative group/card bg-gray-900 rounded-lg p-3 sm:p-4 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-120%', '200%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <p className="text-gray-400 text-xs sm:text-sm mb-1 relative z-10">Total Games</p>
                <p className="text-xl sm:text-2xl font-bold text-white relative z-10">{user?.coinStats?.gamesPlayed || 0}</p>
              </div>
              <div className="relative group/card bg-gray-900 rounded-lg p-3 sm:p-4 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-120%', '200%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <p className="text-gray-400 text-xs sm:text-sm mb-1 relative z-10">Total Bet</p>
                <p className="text-xl sm:text-2xl font-bold text-white relative z-10">{user?.coinStats?.totalBet?.toLocaleString() || 0}</p>
              </div>
              <div className="relative group/card bg-gray-900 rounded-lg p-3 sm:p-4 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-120%', '200%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <p className="text-gray-400 text-xs sm:text-sm mb-1 relative z-10">Total Winnings</p>
                <p className="text-xl sm:text-2xl font-bold text-green-400 relative z-10">{user?.coinStats?.totalWinnings?.toLocaleString() || 0}</p>
              </div>
              <div className="relative group/card bg-gray-900 rounded-lg p-3 sm:p-4 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-120%', '200%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <p className="text-gray-400 text-xs sm:text-sm mb-1 relative z-10">Highest Win</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-400 relative z-10">{user?.coinStats?.highestWin?.toLocaleString() || 0}</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
              <div className="relative group/card bg-gray-900 rounded-lg p-3 sm:p-4 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-120%', '200%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <p className="text-gray-400 text-xs sm:text-sm mb-1 relative z-10">Daily Claims</p>
                <p className="text-xl sm:text-2xl font-bold text-cyan-400 relative z-10">{user?.coinStats?.totalDailyClaims || 0}</p>
              </div>
              <div className="relative group/card bg-gray-900 rounded-lg p-3 sm:p-4 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-120%', '200%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <p className="text-gray-400 text-xs sm:text-sm mb-1 relative z-10">Best Streak</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-400 relative z-10">{user?.coinStats?.dailyClaimsStreak || 0}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

