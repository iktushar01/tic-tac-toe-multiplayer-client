const PlayerCard = ({ player, onChallenge, online }) => {
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

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <div className={`avatar placeholder ${online ? '' : 'opacity-50'}`}>
            <div className={`w-12 rounded-full ${bgColor} text-white`}>
              <span className="text-lg font-bold">{getInitials(player.username)}</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{player.username}</h3>
            <p className="text-sm text-base-content/70">
              {online ? (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Online
                </span>
              ) : (
                'Offline'
              )}
            </p>
          </div>
          {onChallenge && online && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onChallenge(player)}
            >
              Challenge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;

