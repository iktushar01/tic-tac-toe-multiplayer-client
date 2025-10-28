const StatsCard = ({ title, value, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-cyan-500 to-blue-600',
    secondary: 'from-purple-500 to-pink-600',
    accent: 'from-yellow-500 to-orange-600',
    success: 'from-green-500 to-emerald-600',
    warning: 'from-orange-500 to-amber-600',
    error: 'from-red-500 to-rose-600',
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-gray-700 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{title}</div>
        </div>
      </div>
      <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        {value}
      </div>
    </div>
  );
};

export default StatsCard;

