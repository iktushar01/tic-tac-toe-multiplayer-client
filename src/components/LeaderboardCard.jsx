const LeaderboardCard = ({ rank, player, stats }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  const colorIndex = player.id % colors.length;
  const bgColor = colors[colorIndex];

  const getRankMedal = () => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="bg-gray-800 shadow-md hover:shadow-xl transition-all border border-gray-700 rounded-lg">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-cyan-400 w-10 text-center">
            {getRankMedal()}
          </div>
          <div className="avatar placeholder">
            <div className={`w-12 rounded-full ${bgColor} text-white`}>
              <span className="text-lg font-bold">{getInitials(player.username)}</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">{player.username}</h3>
            <p className="text-sm text-gray-400">
              {stats.wins} wins • {stats.winRate}% win rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;

