import React from 'react';
import { 
  IoTrophy, 
  IoCloseCircle, 
  IoTime,
  IoGameController
} from 'react-icons/io5';

/**
 * Get result icon based on game result
 */
export const getResultIcon = (result) => {
  switch (result) {
    case 'win':
      return <IoTrophy className="text-green-400 text-lg" />;
    case 'loss':
      return <IoCloseCircle className="text-red-400 text-lg" />;
    case 'draw':
      return <IoTime className="text-orange-400 text-lg" />;
    default:
      return <IoGameController className="text-gray-400 text-lg" />;
  }
};

/**
 * Get difficulty color class
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-400';
    case 'medium':
      return 'text-yellow-400';
    case 'hard':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};


