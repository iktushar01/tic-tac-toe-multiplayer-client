import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoCash } from 'react-icons/io5';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CoinDisplay = () => {
  const { user } = useAuth();
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCoins();
      
      // Refresh coins every 30 seconds
      const interval = setInterval(loadCoins, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadCoins = async () => {
    try {
      const data = await apiService.getCurrentUser();
      setCoins(data.user.coins || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error loading coins:', error);
      setLoading(false);
    }
  };

  if (!user || loading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <IoCash className="text-white text-xl" />
      </motion.div>
      <motion.span
        key={coins}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="text-white font-bold text-sm"
      >
        {coins.toLocaleString()}
      </motion.span>
    </motion.div>
  );
};

export default CoinDisplay;

