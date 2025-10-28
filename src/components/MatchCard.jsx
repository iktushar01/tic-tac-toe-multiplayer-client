import { formatDate } from '../utils/helpers';

const MatchCard = ({ match }) => {
  const getResultColor = (result) => {
    switch (result) {
      case 'Win':
        return 'text-success';
      case 'Loss':
        return 'text-error';
      case 'Draw':
        return 'text-warning';
      default:
        return 'text-base-content';
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
    <div className="card bg-base-100 shadow hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="w-10 rounded-full bg-neutral text-white">
                <span className="text-xs">
                  {match.opponent.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">{match.opponent}</h4>
              <p className="text-xs text-base-content/70">
                {formatDate(match.date)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold ${getResultColor(match.result)}`}>
              {getResultIcon(match.result)} {match.result}
            </p>
            <p className="text-xs text-base-content/70">
              {match.moves} moves
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

