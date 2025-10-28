import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import MatchCard from '../components/MatchCard';
import { apiService } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample data
  const onlinePlayers = [
    { id: 1, username: 'Player2', online: true },
    { id: 2, username: 'Player3', online: true },
    { id: 3, username: 'Player4', online: true },
    { id: 4, username: 'Player5', online: false },
    { id: 5, username: 'Player6', online: true },
  ];

  const recentMatches = [
    {
      id: '1',
      opponent: 'Player2',
      result: 'Win',
      date: new Date().toISOString(),
      moves: 9,
    },
    {
      id: '2',
      opponent: 'Player3',
      result: 'Loss',
      date: new Date(Date.now() - 86400000).toISOString(),
      moves: 7,
    },
    {
      id: '3',
      opponent: 'Player4',
      result: 'Draw',
      date: new Date(Date.now() - 172800000).toISOString(),
      moves: 9,
    },
  ];

  const handleCreateGame = async () => {
    setLoading(true);
    try {
      const game = await apiService.createGame();
      navigate(`/game/${game.gameId}`, { state: { roomCode: game.roomCode } });
    } catch (error) {
      console.error('Error creating game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!roomCode) {
      alert('Please enter a room code');
      return;
    }
    setLoading(true);
    try {
      const game = await apiService.joinGame(roomCode);
      navigate(`/game/${game.gameId}`, { state: { roomCode: game.roomCode } });
    } catch (error) {
      alert('Invalid room code');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMatch = async () => {
    setLoading(true);
    try {
      const game = await apiService.quickMatch();
      navigate(`/game/${game.gameId}`);
    } catch (error) {
      console.error('Error finding match:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-primary via-secondary to-accent text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
        </div>
        <div className="hero-content text-center py-16 relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="text-6xl mb-4 inline-block">🎮</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              Welcome to X-O Arena
            </h1>
            <p className="text-2xl mb-10 text-white/90">
              Challenge players worldwide in the ultimate Tic Tac Toe multiplayer experience!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                className="btn btn-lg btn-warning hover:scale-105 transition-transform shadow-2xl"
                onClick={handleCreateGame}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    🎯 Create Game
                  </>
                )}
              </button>
              <button
                className="btn btn-lg btn-outline btn-warning hover:scale-105 transition-transform shadow-xl"
                onClick={handleQuickMatch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Searching...
                  </>
                ) : (
                  <>
                    ⚡ Quick Match
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Join Game Section */}
        <section className="mb-12">
          <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-primary/20">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-6 text-primary">
                🎮 Join a Game
              </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold">Enter Room Code</span>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Enter 4-digit code"
                    className="input input-bordered input-primary flex-1 text-lg"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    maxLength={4}
                  />
                  <button
                    className="btn btn-primary btn-lg hover:scale-105 transition-transform"
                    onClick={handleJoinGame}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      'Join Game'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Online Players */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Online Players</h2>
            <div className="space-y-3">
              {onlinePlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  online={player.online}
                  onChallenge={(p) => console.log('Challenge', p)}
                />
              ))}
            </div>
          </section>

          {/* Recent Matches */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Recent Matches</h2>
            <div className="space-y-3">
              {recentMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

