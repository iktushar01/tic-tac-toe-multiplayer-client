import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../../services/api';
import { IoTrophy, IoRefresh, IoStatsChart } from 'react-icons/io5';
import { BsFilter } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('wins');
  const [error, setError] = useState(null);

  const loadLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getLeaderboard(sortBy, 50);
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  useEffect(() => {
    loadLeaderboard();
  }, [sortBy, loadLeaderboard]);

  const getRankColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-gray-600 to-gray-700';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const sortOptions = [
    { value: 'wins', label: 'Most Wins', icon: '🏆' },
    { value: 'winRate', label: 'Win Rate', icon: '📊' },
    { value: 'totalGames', label: 'Total Games', icon: '🎮' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden">
        {/* Gaming Grid Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaderboardGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaderboardGrid)" />
          </svg>
        </div>
        {/* Animated Glow Orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Loading spinner */}
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gaming Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaderboardGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaderboardGrid)" />
        </svg>
      </div>

      {/* Animated Glow Orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -60, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 60, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 min-h-screen py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="mb-6 sm:mb-8 text-center sm:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-yellow-500/20 rounded-lg">
                  <IoTrophy className="text-3xl sm:text-4xl text-yellow-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Leaderboard
                </h1>
              </div>
              <button
                onClick={loadLeaderboard}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 px-3 sm:px-4 text-sm sm:text-base"
                title="Refresh"
              >
                <IoRefresh className="text-gray-300 text-lg sm:text-xl" />
                <span className="text-gray-300">Refresh</span>
              </button>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-400">
              Top players ranked by performance
            </p>
          </motion.div>

          {/* Sort Options - segmented control */}
          <motion.div 
            className="mb-4 sm:mb-6 bg-gray-900/60 border border-cyan-700/40 rounded-xl p-3 sm:p-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <BsFilter className="text-cyan-400 text-lg sm:text-xl" />
              <h2 className="text-base sm:text-lg font-semibold text-white">Sort By</h2>
            </div>

            <div className="relative inline-flex bg-gray-800/70 border border-cyan-700/30 rounded-lg p-1">
              {sortOptions.map((option) => {
                const active = sortBy === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all overflow-hidden ${
                      active ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sortIndicator"
                        className="absolute inset-0 rounded-md bg-linear-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.45)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                      <span className="text-sm sm:text-base">{option.icon}</span>
                      <span>{option.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400">
              {error}
            </div>
          )}

          {/* Leaderboard Table - gaming style */}
          <motion.div 
            className="bg-linear-to-r from-gray-900/90 to-gray-800/80 border-2 border-cyan-700/30 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {leaderboard.length === 0 ? (
              <div className="text-center py-8 sm:py-12 px-4">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🏆</div>
                <p className="text-gray-400 text-base sm:text-lg">No players yet. Be the first!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-gray-800/80 backdrop-blur sticky top-0 z-10">
                    <tr>
                      <th className="px-2 sm:px-3 md:px-4 py-3 text-left text-[10px] sm:text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-3 text-left text-[10px] sm:text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                        Wins
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                        Losses
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold text-cyan-200 uppercase tracking-wider hidden sm:table-cell">
                        Draws
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                        Win Rate
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold text-cyan-200 uppercase tracking-wider hidden md:table-cell">
                        Total Games
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-900/60">
                    {leaderboard.map((player, index) => (
                      <motion.tr
                        key={player.userId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.06 }}
                        className="hover:bg-cyan-900/20 transition-colors"
                      >
                        {/* Rank */}
                        <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                          <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-r ${getRankColor(player.rank)} text-white font-bold text-xs sm:text-sm relative`}>
                            {(player.rank === 1 || player.rank === 2 || player.rank === 3) && (
                              <motion.div
                                className={`absolute inset-0 rounded-full pointer-events-none`}
                                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.06, 1] }}
                                transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.24) 0%, transparent 65%)' }}
                              />
                            )}
                            {getRankIcon(player.rank)}
                          </div>
                        </td>

                        {/* Player */}
                        <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            {player.photoURL ? (
                              <img 
                                src={player.photoURL} 
                                alt={player.username}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 shadow-md shadow-cyan-500/20"
                              />
                            ) : (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-sm sm:text-lg">
                                  {player.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <span className="font-semibold text-white text-xs sm:text-sm truncate">{player.username}</span>
                          </div>
                        </td>

                        {/* Wins */}
                        <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-center">
                          <span className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm font-semibold">
                            {player.stats.wins}
                          </span>
                        </td>

                        {/* Losses */}
                        <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-center">
                          <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs sm:text-sm font-semibold">
                            {player.stats.losses}
                          </span>
                        </td>

                        {/* Draws */}
                        <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-center hidden sm:table-cell">
                          <span className="px-2 sm:px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs sm:text-sm font-semibold">
                            {player.stats.draws}
                          </span>
                        </td>

                        {/* Win Rate with bar */}
                        <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                          <div className="flex items-center justify-center gap-2">
                            <IoStatsChart className="text-cyan-400 text-sm sm:text-base shrink-0" />
                            <div className="w-24 sm:w-28 md:w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-linear-to-r from-cyan-400 to-blue-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, Math.max(0, player.stats.winRate))}%` }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.02 }}
                              />
                            </div>
                            <span className="text-cyan-400 font-bold text-xs sm:text-sm w-10 text-right">
                              {player.stats.winRate}%
                            </span>
                          </div>
                        </td>

                        {/* Total Games */}
                        <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-center hidden md:table-cell">
                          <span className="text-gray-300 font-semibold text-xs sm:text-sm">{player.stats.totalGames}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Footer Info */}
          <motion.div 
            className="mt-6 text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>Showing top {leaderboard.length} players</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
