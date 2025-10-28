import { formatDate } from '../../utils/helpers';

const MatchCard = ({ match }) => {
  const getResultColor = (result) => {
    switch (result) {
      case 'Win':
        return 'text-green-400';
      case 'Loss':
        return 'text-red-400';
      case 'Draw':
        return 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

  const getResultIcon = (result) => {
    switch (result) {
      case 'Win':
        return '🏆';
      case 'Loss':
        return '😢';
      case 'Draw':
        return '🤝';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-800 shadow hover:shadow-md transition-shadow border border-gray-700 rounded-lg">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="w-10 rounded-full bg-gray-700 text-white">
                <span className="text-xs">
                  {match.opponent.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white">{match.opponent}</h4>
              <p className="text-xs text-gray-400">
                {formatDate(match.date)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold ${getResultColor(match.result)}`}>
              {getResultIcon(match.result)} {match.result}
            </p>
            <p className="text-xs text-gray-400">
              {match.moves} moves
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

