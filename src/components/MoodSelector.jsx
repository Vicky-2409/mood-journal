import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMood } from '../context/MoodContext';
import MoodIcon from './MoodIcon';

const MoodSelector = () => {
  const { darkMode } = useTheme();
  const { selectedMood, setSelectedMood } = useMood();
  
  const moods = [
    { id: 'happy', label: 'Happy' },
    { id: 'neutral', label: 'Neutral' },
    { id: 'meh', label: 'Meh' },
    { id: 'sad', label: 'Sad' },
    { id: 'terrible', label: 'Terrible' }
  ];
  
  return (
    <div className="flex justify-between items-center w-full">
      {moods.map((mood) => (
        <div key={mood.id} className="flex flex-col items-center w-0">
          <button
            className={`mood-btn flex flex-col items-center p-2 rounded-full transition-all duration-200 ${
              selectedMood === mood.id ? 'transform scale-110 shadow-lg' : 'hover:scale-105'
            }`}
            onClick={() => setSelectedMood(mood.id)}
            aria-label={mood.label}
          >
            <MoodIcon 
              mood={mood.id} 
              size="lg" 
              selected={selectedMood === mood.id} 
            />
          </button>
          <span className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {mood.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MoodSelector;