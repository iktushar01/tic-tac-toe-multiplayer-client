import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';
import MatchCard from './MatchCard';
import LeaderboardCard from './LeaderboardCard';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { IoStatsChart, IoTrophy } from 'react-icons/io5';
import { BsGraphDown, BsTrophyFill, BsPeopleFill, BsClockHistory } from 'react-icons/bs';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch stats
      apiService.getUserStats(user.uid).then(setStats);

      // Fetch match history
      apiService.getMatchHistory(user.uid).then(setMatchHistory);

      // Sample leaderboard data
      setLeaderboard([
        { id: 1, username: 'Champion', wins: 120, winRate: 75 },
        { id: 2, username: 'Master', wins: 95, winRate: 68 },
        { id: 3, username: 'Pro', wins: 80, winRate: 65 },
        { id: 4, username: user?.displayName || 'Player', wins: 45, winRate: 50 },
        { id: 5, username: 'Warrior', wins: 40, winRate: 45 },
      ]);
    }
  }, [user]);

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading dashboard...</p>
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
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <IoStatsChart className="text-4xl text-cyan-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-400">
            Here's your performance overview and game statistics.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatsCard
              title="Total Wins"
              value={stats.wins}
              icon={<IoTrophy className="text-white text-2xl" />}
              color="success"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatsCard
              title="Total Losses"
              value={stats.losses}
              icon={<BsGraphDown className="text-white text-2xl" />}
              color="error"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatsCard
              title="Draws"
              value={stats.draws}
              icon={<BsPeopleFill className="text-white text-2xl" />}
              color="warning"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatsCard
              title="Win Rate"
              value={`${stats.winRate}%`}
              icon={<IoStatsChart className="text-white text-2xl" />}
              color="primary"
            />
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Match History */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <BsClockHistory className="text-2xl text-cyan-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">Recent Match History</h2>
            </div>
            <div className="bg-gray-800 shadow-2xl border border-gray-700 rounded-lg hover:border-cyan-500/50 transition-all">
              <div className="p-4 sm:p-6">
                {matchHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎮</div>
                    <p className="text-gray-400 text-lg">
                      No matches yet. Start playing to see your history!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {matchHistory.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Leaderboard */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <BsTrophyFill className="text-2xl text-yellow-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">Top Players</h2>
            </div>
            <div className="bg-gray-800 shadow-2xl border border-gray-700 rounded-lg hover:border-yellow-500/50 transition-all">
              <div className="p-4 sm:p-6">
                {leaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-gray-400 text-lg">
                      No leaderboard data available.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leaderboard.map((player, index) => (
                      <LeaderboardCard
                        key={player.id}
                        rank={index + 1}
                        player={player}
                        stats={{ wins: player.wins, winRate: player.winRate }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Performance Overview */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg hover:border-cyan-500/50 transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <IoStatsChart className="text-2xl text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Performance Overview</h2>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 py-4">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-5xl mb-3">✅</div>
                  <p className="text-3xl font-bold text-green-400">{stats.wins}</p>
                  <p className="text-sm text-gray-400 mt-1">Wins</p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-5xl mb-3">❌</div>
                  <p className="text-3xl font-bold text-red-400">{stats.losses}</p>
                  <p className="text-sm text-gray-400 mt-1">Losses</p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-5xl mb-3">🤝</div>
                  <p className="text-3xl font-bold text-orange-400">{stats.draws}</p>
                  <p className="text-sm text-gray-400 mt-1">Draws</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

