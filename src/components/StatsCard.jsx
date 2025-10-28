const StatsCard = ({ title, value, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-primary to-primary-focus',
    secondary: 'bg-gradient-to-br from-secondary to-secondary-focus',
    accent: 'bg-gradient-to-br from-accent to-accent-focus',
    success: 'bg-gradient-to-br from-success to-success-focus',
    warning: 'bg-gradient-to-br from-warning to-warning-focus',
    error: 'bg-gradient-to-br from-error to-error-focus',
  };

  return (
    <div className="stat bg-base-100 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-base-300">
      <div className="stat-figure text-primary">
        <div className={`w-16 h-16 rounded-full ${colorClasses[color]} flex items-center justify-center text-white text-3xl shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="stat-title text-base-content/70 font-semibold">{title}</div>
      <div className="stat-value text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {value}
      </div>
    </div>
  );
};

export default StatsCard;

