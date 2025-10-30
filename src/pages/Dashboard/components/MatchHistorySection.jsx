import { motion } from 'framer-motion';
import { BsClockHistory } from 'react-icons/bs';
import { IoGrid, IoCog, IoGameController, IoTime, IoFlash } from 'react-icons/io5';
import { formatDuration, formatDate } from '../utils/formatters';
import { getResultIcon, getDifficultyColor } from '../utils/gameUtils';
import { useState } from 'react';

const MatchHistorySection = ({ computerGames }) => {
  const [hoveredGame, setHoveredGame] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      {/* Gaming Container with Grid Background */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Grid Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="matchHistoryGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#matchHistoryGrid)" />
          </svg>
        </div>

        {/* Animated Glow Effect */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10 p-4 sm:p-5 md:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <BsClockHistory className="text-purple-400 text-lg sm:text-xl" />
            <span>Match History ({computerGames.length})</span>
          </h2>
          {computerGames.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎮</div>
              <p className="text-gray-400 text-base sm:text-lg">No computer games played yet.</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 px-4">Start playing against the AI to see your match history!</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {computerGames.slice(0, 5).map((game, index) => {
                const isHovered = hoveredGame === game.gameId;
                
                return (
                  <motion.div 
                    key={game.gameId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onHoverStart={() => setHoveredGame(game.gameId)}
                    onHoverEnd={() => setHoveredGame(null)}
                    className="relative group"
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    />

                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-500/20 group-hover:border-purple-500/60 rounded-xl p-3 sm:p-4 transition-all overflow-hidden">
                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                        animate={isHovered ? { x: ['-100%', '200%'] } : {}}
                        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
                      />

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full" />

                      <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <motion.div
                              animate={isHovered ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {getResultIcon(game.result)}
                            </motion.div>
                            <div>
                              <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                                {game.result ? game.result.charAt(0).toUpperCase() + game.result.slice(1) : 'In Progress'}
                                {game.result === 'win' && (
                                  <motion.span
                                    className="text-yellow-400"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  >
                                    <IoFlash className="text-sm" />
                                  </motion.span>
                                )}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-400 font-mono">#{game.gameId}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right w-full sm:w-auto bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-700/50">
                            <p className="text-xs sm:text-sm text-gray-300 font-semibold">
                              {game.completedAt ? formatDate(game.completedAt) : formatDate(game.createdAt)}
                            </p>
                            {game.gameDuration && (
                              <p className="text-xs text-purple-400 font-medium">
                                ⏱️ {formatDuration(game.gameDuration)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
                          <motion.div 
                            className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 rounded-lg px-2 sm:px-3 py-2 border border-cyan-500/20 group/stat"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                          >
                            <IoGrid className="text-cyan-400 flex-shrink-0 group-hover/stat:animate-pulse" />
                            <span className="text-gray-300 truncate">
                              <span className="text-cyan-400 font-bold">{game.boardSize}×{game.boardSize}</span>
                            </span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 rounded-lg px-2 sm:px-3 py-2 border border-purple-500/20 group/stat"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)' }}
                          >
                            <IoCog className={`${getDifficultyColor(game.aiDifficulty)} flex-shrink-0 group-hover/stat:animate-spin`} />
                            <span className="text-gray-300 truncate">
                              <span className={`font-bold ${getDifficultyColor(game.aiDifficulty)}`}>
                                {game.aiDifficulty.charAt(0).toUpperCase() + game.aiDifficulty.slice(1)}
                              </span>
                            </span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 rounded-lg px-2 sm:px-3 py-2 border border-orange-500/20 group/stat"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                          >
                            <IoGameController className="text-orange-400 flex-shrink-0 group-hover/stat:animate-bounce" />
                            <span className="text-gray-300 truncate">
                              <span className="text-orange-400 font-bold">{game.totalMoves}</span> Moves
                            </span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 rounded-lg px-2 sm:px-3 py-2 border border-blue-500/20 group/stat"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                          >
                            <IoTime className="text-blue-400 flex-shrink-0 group-hover/stat:animate-pulse" />
                            <span className={`font-bold truncate ${
                              game.status === 'completed' ? 'text-green-400' : 
                              game.status === 'playing' ? 'text-yellow-400' : 'text-gray-400'
                            }`}>
                              {game.status}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {computerGames.length > 5 && (
                <div className="text-center mt-4">
                  <p className="text-gray-400 text-sm">
                    Showing 5 of {computerGames.length} games
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MatchHistorySection;

