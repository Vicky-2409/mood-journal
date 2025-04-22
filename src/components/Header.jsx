import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaChartBar, FaList, FaHome } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useMood } from '../context/MoodContext';
import WeatherDisplay from './WeatherDisplay';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { weather, locationName } = useMood();
  const location = useLocation();
  
  const getBgColor = () => {
    const { selectedMood } = useMood();
    
    if (darkMode) {
      return 'bg-gray-800';
    }
    
    const moodColors = {
      happy: 'bg-yellow-400',
      neutral: 'bg-orange-300',
      meh: 'bg-yellow-200',
      sad: 'bg-red-300',
      terrible: 'bg-green-200'
    };
    
    return selectedMood ? moodColors[selectedMood] : 'bg-orange-300';
  };
  
  return (
    <div className={`${getBgColor()} rounded-t-3xl p-4 transition-colors duration-300`}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>MoodMate</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {locationName && (
            <div className={`text-sm hidden md:block ${darkMode ? 'text-gray-300' : 'text-white'}`}>
              📍 {locationName}
            </div>
          )}
          
          <WeatherDisplay weather={weather} />
          
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-orange-200 text-gray-800'}`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
      
      <div className="flex justify-center">
        <nav className={`flex gap-2 bg-opacity-20 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full p-1 shadow-md`}>
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 ${
              location.pathname === '/' 
                ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white text-orange-500 shadow') 
                : (darkMode ? 'text-gray-300 hover:text-white' : 'text-orange-500 hover:bg-white hover:bg-opacity-30')
            }`}
          >
            <FaHome /> <span className="hidden sm:inline">Home</span>
          </Link>
          <Link 
            to="/all-notes" 
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 ${
              location.pathname === '/all-notes' 
                ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white text-orange-500 shadow') 
                : (darkMode ? 'text-gray-300 hover:text-white' : 'text-orange-500 hover:bg-white hover:bg-opacity-30')
            }`}
          >
            <FaList /> <span className="hidden sm:inline">Notes</span>
          </Link>
          <Link 
            to="/stats" 
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 ${
              location.pathname === '/stats' 
                ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white text-orange-500 shadow') 
                : (darkMode ? 'text-gray-300 hover:text-white' : 'text-orange-500 hover:bg-white hover:bg-opacity-30')
            }`}
          >
            <FaChartBar /> <span className="hidden sm:inline">Stats</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;