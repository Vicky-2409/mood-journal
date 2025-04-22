import React from 'react';
import { useTheme } from '../context/ThemeContext';

const MoodIcon = ({ mood, size = 'md', selected = false }) => {
  const { darkMode } = useTheme();
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6 text-sm';
      case 'md':
        return 'w-8 h-8 text-xl';
      case 'lg':
        return 'w-16 h-16 text-3xl';
      default:
        return 'w-8 h-8 text-xl';
    }
  };
  
  const getBgColor = () => {
    if (darkMode) {
      return selected ? 'bg-gray-600' : 'bg-gray-700';
    }
    
    const bgColors = {
      happy: 'bg-yellow-400',
      neutral: 'bg-yellow-300',
      meh: 'bg-yellow-200',
      sad: 'bg-red-400',
      terrible: 'bg-green-300'
    };
    
    return bgColors[mood] || 'bg-gray-200';
  };
  
  const getEmoji = () => {
    const emojis = {
      happy: '😊',
      neutral: '😐',
      meh: '😕',
      sad: '😢',  // Changed from '😠' (angry) to '😢' (sad) to match the mood label
      terrible: '😩'
    };
    
    return emojis[mood] || '😐';
  };
  
  return (
    <div 
      className={`${getSizeClass()} ${getBgColor()} flex items-center justify-center rounded-full ${
        selected ? 'ring-2 ring-orange-400' : ''
      }`}
    >
      <span>{getEmoji()}</span>
    </div>
  );
};

export default MoodIcon;