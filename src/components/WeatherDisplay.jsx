
// File: src/components/WeatherDisplay.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import WeatherIcon from './WeatherIcon';

const WeatherDisplay = ({ weather }) => {
  const { darkMode } = useTheme();
  
  if (!weather || !weather.temp) return null;
  
  return (
    <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-white'}`}>
      <WeatherIcon condition={weather.condition} />
      <span>{weather.temp}°C</span>
    </div>
  );
};

export default WeatherDisplay;