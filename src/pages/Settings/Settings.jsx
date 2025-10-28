import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoVolumeHigh, 
  IoNotifications, 
  IoMoon, 
  IoLanguage,
  IoSettingsSharp
} from 'react-icons/io5';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <IoSettingsSharp className="text-4xl text-cyan-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-400">
            Customize your gaming experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <motion.div 
            className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <IoNotifications className="text-2xl text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <IoNotifications className="text-xl text-gray-300" />
                  <div>
                    <p className="text-white font-semibold">Game Notifications</p>
                    <p className="text-sm text-gray-400">Receive game alerts and updates</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Sound Settings */}
          <motion.div 
            className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <IoVolumeHigh className="text-2xl text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Sound</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <IoVolumeHigh className="text-xl text-gray-300" />
                  <div>
                    <p className="text-white font-semibold">Sound Effects</p>
                    <p className="text-sm text-gray-400">Enable game sound effects</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div 
            className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <IoMoon className="text-2xl text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-semibold">Dark Mode</p>
                  <span className="text-sm text-gray-400">Always enabled</span>
                </div>
                <p className="text-sm text-gray-400">
                  The application is always in dark mode for the best experience
                </p>
              </div>
            </div>
          </motion.div>

          {/* Language */}
          <motion.div 
            className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <IoLanguage className="text-2xl text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Language</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <label className="block text-white font-semibold mb-2">Select Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all"
                >
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
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50">
            Save Settings
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;

