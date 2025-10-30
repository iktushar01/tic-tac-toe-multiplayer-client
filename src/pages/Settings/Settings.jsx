import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoVolumeHigh, 
  IoNotifications, 
  IoMoon, 
  IoLanguage,
  IoSettingsSharp
} from 'react-icons/io5';

// reference to satisfy linter for JSX member usage
void motion;

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gaming Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="settingsGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#settingsGrid)" />
        </svg>
      </div>
      {/* Animated Glow Orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyan-500/20"
        animate={{ scale:[1,1.2,1], x:[0,-60,0], opacity:[0.2,0.3,0.2] }}
        transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] bg-purple-500/20"
        animate={{ scale:[1,1.3,1], x:[0,60,0], opacity:[0.2,0.3,0.2] }}
        transition={{ duration:10, repeat:Infinity, ease:'easeInOut' }}
      />

      <div className="relative z-10 min-h-screen py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <div className="p-1.5 sm:p-2 bg-cyan-500/20 rounded-lg">
                <IoSettingsSharp className="text-3xl sm:text-4xl text-cyan-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Settings
              </h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-400">
              Customize your gaming experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Notifications */}
            <motion.div 
              className="relative group bg-gray-900/70 border border-cyan-700/40 rounded-lg p-4 sm:p-5 md:p-6 shadow-xl backdrop-blur overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ background:'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }} animate={{ x:['-100%','100%'] }} transition={{ duration:1.5, repeat:Infinity }} />
              <div className="flex items-center gap-2 sm:gap-3 mb-4 relative z-10">
                <div className="p-1.5 sm:p-2 bg-cyan-500/20 rounded-lg">
                  <IoNotifications className="text-xl sm:text-2xl text-cyan-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Notifications</h2>
              </div>
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-800/60 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <IoNotifications className="text-lg sm:text-xl text-gray-300 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm sm:text-base">Game Notifications</p>
                      <p className="text-xs sm:text-sm text-gray-400">Receive game alerts and updates</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notifications} onChange={(e)=> setNotifications(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Sound Settings */}
            <motion.div 
              className="relative group bg-gray-900/70 border border-cyan-700/40 rounded-lg p-6 shadow-xl backdrop-blur overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ background:'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }} animate={{ x:['-100%','100%'] }} transition={{ duration:1.5, repeat:Infinity }} />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <IoVolumeHigh className="text-2xl text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Sound</h2>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-4 bg-gray-800/60 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <IoVolumeHigh className="text-xl text-gray-300" />
                    <div>
                      <p className="text-white font-semibold">Sound Effects</p>
                      <p className="text-sm text-gray-400">Enable game sound effects</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={soundEffects} onChange={(e)=> setSoundEffects(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Appearance */}
            <motion.div 
              className="relative group bg-gray-900/70 border border-cyan-700/40 rounded-lg p-6 shadow-xl backdrop-blur overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ background:'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }} animate={{ x:['-100%','100%'] }} transition={{ duration:1.5, repeat:Infinity }} />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <IoMoon className="text-2xl text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Appearance</h2>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="p-4 bg-gray-800/60 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-semibold">Dark Mode</p>
                    <span className="text-sm text-gray-400">Always enabled</span>
                  </div>
                  <p className="text-sm text-gray-400">The application is always in dark mode for the best experience</p>
                </div>
              </div>
            </motion.div>

            {/* Language */}
            <motion.div 
              className="relative group bg-gray-900/70 border border-cyan-700/40 rounded-lg p-6 shadow-xl backdrop-blur overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ background:'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }} animate={{ x:['-100%','100%'] }} transition={{ duration:1.5, repeat:Infinity }} />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <IoLanguage className="text-2xl text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Language</h2>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="p-4 bg-gray-800/60 rounded-lg">
                  <label className="block text-white font-semibold mb-2">Select Language</label>
                  <select value={language} onChange={(e)=> setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div 
            className="mt-8 flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button className="relative overflow-hidden px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50">
              <span className="relative z-10">Save Settings</span>
              <motion.span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" initial={{ x:'-120%' }} animate={{ x:['-120%','200%'] }} transition={{ duration:1.2, repeat:Infinity, repeatDelay:0.8 }} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

