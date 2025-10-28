import { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import MatchCard from '../components/MatchCard';
import LeaderboardCard from '../components/LeaderboardCard';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

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
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-base-content/70">
            Here's your performance overview and game statistics.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Wins"
            value={stats.wins}
            icon="🏆"
            color="success"
          />
          <StatsCard
            title="Total Losses"
            value={stats.losses}
            icon="📉"
            color="error"
          />
          <StatsCard
            title="Draws"
            value={stats.draws}
            icon="🤝"
            color="warning"
          />
          <StatsCard
            title="Win Rate"
            value={`${stats.winRate}%`}
            icon="📊"
            color="primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Match History */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-primary">🏆 Recent Match History</h2>
            <div className="card bg-base-100 shadow-2xl border border-primary/20">
              <div className="card-body">
                {matchHistory.length === 0 ? (
                  <p className="text-center text-base-content/50 py-8">
                    No matches yet. Start playing to see your history!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {matchHistory.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Leaderboard */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-primary">🥇 Top Players</h2>
            <div className="card bg-base-100 shadow-2xl border border-primary/20">
              <div className="card-body">
                {leaderboard.length === 0 ? (
                  <p className="text-center text-base-content/50 py-8">
                    No leaderboard data available.
                  </p>
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
          </section>
        </div>

        {/* Win/Loss Chart Placeholder */}
        <div className="mt-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>
              <div className="flex justify-center items-center h-64">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-2xl font-bold text-success">{stats.wins}</p>
                    <p className="text-sm text-base-content/70">Wins</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">❌</div>
                    <p className="text-2xl font-bold text-error">{stats.losses}</p>
                    <p className="text-sm text-base-content/70">Losses</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤝</div>
                    <p className="text-2xl font-bold text-warning">{stats.draws}</p>
                    <p className="text-sm text-base-content/70">Draws</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

