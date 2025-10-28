import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { IoAddCircle, IoEnter, IoHome } from 'react-icons/io5';

const RoomSelector = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');

  const handleCreateRoom = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const game = await apiService.createGame();
      navigate(`/game/room/${game.gameId}`, { state: { roomCode: game.roomCode } });
    } catch (err) {
      setError('Failed to create room');
      console.error('Error creating room:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleJoinRoom = useCallback(async () => {
    if (!roomCode) {
      setError('Please enter a room code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const game = await apiService.joinGame(roomCode);
      navigate(`/game/room/${game.gameId}`, { state: { roomCode: game.roomCode } });
    } catch (err) {
      setError('Invalid room code or room not found');
      console.error('Join room error:', err);
    } finally {
      setLoading(false);
    }
  }, [roomCode, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
            🧩 Custom Room
          </h1>
          <p className="text-gray-400 text-lg">
            Create a new room or join an existing one
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Room Card */}
          <div className="bg-gray-800 border border-gray-700 hover:border-green-500/50 transition-all rounded-lg overflow-hidden shadow-xl">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <IoAddCircle className="text-4xl text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                Create Room
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Start a new game room and invite friends
              </p>
              <button
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={handleCreateRoom}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <IoAddCircle className="text-xl" />
                    <span>Create Room</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Join Room Card */}
          <div className="bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all rounded-lg overflow-hidden shadow-xl">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <IoEnter className="text-4xl text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                Join Room
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Enter a room code to join
              </p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter room code"
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  value={roomCode}
                  onChange={(e) => {
                    setRoomCode(e.target.value);
                    setError('');
                  }}
                  maxLength={10}
                  disabled={loading}
                />
                <button
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={handleJoinRoom}
                  disabled={loading || !roomCode}
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <IoEnter className="text-xl" />
                      <span>Join Room</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all border border-gray-600 flex items-center justify-center gap-2 mx-auto"
            onClick={() => navigate('/')}
          >
            <IoHome className="text-xl" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSelector;

