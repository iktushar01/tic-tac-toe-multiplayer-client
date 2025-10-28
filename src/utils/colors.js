// Custom color scheme for dark theme
export const colors = {
  background: {
    primary: 'bg-gray-900',
    secondary: 'bg-gray-800',
    tertiary: 'bg-gray-700',
    card: 'bg-gray-800',
    input: 'bg-gray-700',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    accent: 'text-yellow-400',
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-orange-400',
  },
  border: {
    primary: 'border-gray-700',
    secondary: 'border-gray-600',
    accent: 'border-yellow-500',
  },
  accent: {
    primary: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    secondary: 'bg-gradient-to-br from-purple-500 to-pink-600',
    button: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700',
  }
};

export const getColorClass = (category, type) => {
  return colors[category]?.[type] || '';
};

