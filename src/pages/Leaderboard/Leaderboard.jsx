import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../../services/api';
import { IoTrophy, IoRefresh, IoStatsChart } from 'react-icons/io5';
import { BsFilter } from 'react-icons/bs';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('wins');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, [sortBy]);

  const loadLeaderboard = async () => {
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
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-8 text-center sm:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <IoTrophy className="text-4xl text-yellow-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Leaderboard
              </h1>
            </div>
            <button
              onClick={loadLeaderboard}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 px-4"
              title="Refresh"
            >
              <IoRefresh className="text-gray-300 text-xl" />
              <span className="text-gray-300">Refresh</span>
            </button>
          </div>
          <p className="text-base sm:text-lg text-gray-400">
            Top players ranked by performance
          </p>
        </motion.div>

        {/* Sort Options */}
        <motion.div 
          className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <BsFilter className="text-cyan-400 text-xl" />
            <h2 className="text-lg font-semibold text-white">Sort By</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'wins', label: 'Most Wins', icon: '🏆' },
              { value: 'winRate', label: 'Win Rate', icon: '📊' },
              { value: 'totalGames', label: 'Total Games', icon: '🎮' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  sortBy === option.value
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Leaderboard Table */}
        <motion.div 
          className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-gray-400 text-lg">No players yet. Be the first!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Wins
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Losses
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Draws
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Win Rate
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total Games
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaderboard.map((player, index) => (
                    <motion.tr
                      key={player.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${getRankColor(player.rank)} text-white font-bold`}>
                          {getRankIcon(player.rank)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {player.photoURL ? (
                            <img 
                              src={player.photoURL} 
                              alt={player.username}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {player.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="font-semibold text-white">{player.username}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                          {player.stats.wins}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
                          {player.stats.losses}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                          {player.stats.draws}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <IoStatsChart className="text-cyan-400" />
                          <span className="text-cyan-400 font-bold">{player.stats.winRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-gray-300 font-semibold">{player.stats.totalGames}</span>
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
  );
};

export default Leaderboard;
