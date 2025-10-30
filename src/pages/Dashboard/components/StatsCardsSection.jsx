import { motion } from 'framer-motion';
import { IoTrophy, IoStatsChart, IoCash, IoFlash, IoShield } from 'react-icons/io5';
import { BsGraphDown, BsPeopleFill } from 'react-icons/bs';
import { useState } from 'react';

const StatsCardsSection = ({ stats, userData }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const statCards = [
    {
      id: 'wins',
      label: 'Total Wins',
      value: stats?.wins || 0,
      icon: IoTrophy,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/50',
      borderColor: 'border-green-500/30',
      hoverBorder: 'group-hover:border-green-500',
      delay: 0.1
    },
    {
      id: 'losses',
      label: 'Total Losses',
      value: stats?.losses || 0,
      icon: BsGraphDown,
      color: 'red',
      gradient: 'from-red-500 to-rose-600',
      glow: 'shadow-red-500/50',
      borderColor: 'border-red-500/30',
      hoverBorder: 'group-hover:border-red-500',
      delay: 0.2
    },
    {
      id: 'draws',
      label: 'Draws',
      value: stats?.draws || 0,
      icon: BsPeopleFill,
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      glow: 'shadow-orange-500/50',
      borderColor: 'border-orange-500/30',
      hoverBorder: 'group-hover:border-orange-500',
      delay: 0.3
    },
    {
      id: 'winRate',
      label: 'Win Rate',
      value: `${stats?.winRate || 0}%`,
      icon: IoStatsChart,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'shadow-cyan-500/50',
      borderColor: 'border-cyan-500/30',
      hoverBorder: 'group-hover:border-cyan-500',
      delay: 0.4
    },
    {
      id: 'coins',
      label: 'Coins',
      value: userData?.coins?.toLocaleString() || 0,
      icon: IoCash,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500',
      glow: 'shadow-yellow-500/50',
      borderColor: 'border-yellow-400/50',
      hoverBorder: 'group-hover:border-yellow-400',
      special: true,
      delay: 0.5
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      {statCards.map((card) => {
        const Icon = card.icon;
        const isHovered = hoveredCard === card.id;
        
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: card.delay, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onHoverStart={() => setHoveredCard(card.id)}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative group"
          >
            {/* Glow Effect on Hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
              animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            />

            {/* Card Content */}
            <div className={`relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 ${card.borderColor} ${card.hoverBorder} rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 overflow-hidden ${card.special ? 'ring-2 ring-yellow-500/20' : ''}`}>
              {/* Animated Scan Line */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none`}
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(${card.color === 'green' ? '34, 197, 94' : card.color === 'red' ? '239, 68, 68' : card.color === 'orange' ? '249, 115, 22' : card.color === 'cyan' ? '6, 182, 212' : '234, 179, 8'}, 0.3), transparent)`,
                }}
                animate={isHovered ? { x: ['-100%', '100%'] } : {}}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
              />
              
              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${card.gradient} opacity-10 rounded-bl-full`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{card.label}</p>
                    <motion.p 
                      className={`text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                      animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {card.value}
                    </motion.p>
                  </div>
                  
                  {/* Icon with Animation */}
                  <motion.div
                    className={`p-2 sm:p-3 bg-gradient-to-r ${card.gradient} rounded-lg ${card.glow} shadow-lg`}
                    animate={isHovered ? { 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-white text-xl sm:text-2xl md:text-3xl" />
                  </motion.div>
                </div>

                {/* Progress Bar (For Special Cards) */}
                {card.special && (
                  <motion.div 
                    className="mt-3 h-1.5 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: card.delay + 0.2 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: card.delay + 0.3 }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={isHovered ? { x: '200%' } : { x: '-100%' }}
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCardsSection;

