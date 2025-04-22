// File: src/components/WeatherIcon.jsx
import React from 'react';
import { 
  FaSun, FaCloudSun, FaCloud, FaCloudRain, 
  FaCloudShowersHeavy, FaBolt, FaSnowflake, FaSmog 
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const WeatherIcon = ({ condition }) => {
  const { darkMode } = useTheme();
  const iconColor = darkMode ? '#e2e8f0' : '#f97316';
  
  const getWeatherIcon = () => {
    switch (condition?.toLowerCase()) {
      case 'clear':
        return <FaSun color={iconColor} />;
      case 'few clouds':
      case 'scattered clouds':
      case 'partly cloudy':
        return <FaCloudSun color={iconColor} />;
      case 'clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <FaCloud color={iconColor} />;
      case 'shower rain':
      case 'light rain':
        return <FaCloudRain color={iconColor} />;
      case 'rain':
      case 'moderate rain':
      case 'heavy intensity rain':
        return <FaCloudShowersHeavy color={iconColor} />;
      case 'thunderstorm':
        return <FaBolt color={iconColor} />;
      case 'snow':
        return <FaSnowflake color={iconColor} />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <FaSmog color={iconColor} />;
      default:
        return <FaSun color={iconColor} />;
    }
  };

  return getWeatherIcon();
};

export default WeatherIcon;
