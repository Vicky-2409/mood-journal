import React, { useState } from 'react';
import { FaFileDownload, FaFilter } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useMood } from '../context/MoodContext';
import MoodIcon from '../components/MoodIcon';
import WeatherIcon from '../components/WeatherIcon';
import Header from '../components/Header';

const AllNotes = () => {
  const { darkMode } = useTheme();
  const { filterMood, setFilterMood, getFilteredEntries, exportToCSV } = useMood();
  const filteredEntries = getFilteredEntries();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getBgColor = () => {
    if (darkMode) {
      return 'bg-gray-900';
    }
    return 'bg-gradient-to-b from-orange-300 to-orange-200';
  };

  return (
    <div className={`min-h-screen ${getBgColor()} transition-colors duration-500`}>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className={`rounded-3xl shadow-lg overflow-hidden ${darkMode ? 'shadow-gray-700' : ''}`}>
          <Header />
          
          <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-orange-50'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} font-display`}>
                All Notes
              </h2>
              
              <div className="flex gap-2">
                <button 
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-200 hover:bg-orange-300'}`}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  aria-label="Filter entries"
                >
                  <FaFilter />
                </button>
                
                <button 
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-200 hover:bg-orange-300'}`}
                  onClick={exportToCSV}
                  aria-label="Export to CSV"
                >
                  <FaFileDownload />
                </button>
              </div>
            </div>
            
            {isFilterOpen && (
              <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-orange-100'}`}>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-3 py-1 rounded-full text-sm ${
                      filterMood === 'all' 
                        ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white') 
                        : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600')
                    }`}
                    onClick={() => setFilterMood('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      filterMood === 'happy' 
                        ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white') 
                        : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600')
                    }`}
                    onClick={() => setFilterMood('happy')}
                  >
                    <span className="text-lg">😊</span> Happy
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      filterMood === 'neutral' 
                        ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white') 
                        : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600')
                    }`}
                    onClick={() => setFilterMood('neutral')}
                  >
                    <span className="text-lg">😐</span> Neutral
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      filterMood === 'meh' 
                        ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white') 
                        : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600')
                    }`}
                    onClick={() => setFilterMood('meh')}
                  >
                    <span className="text-lg">😕</span> Meh
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      filterMood === 'sad' 
                        ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white') 
                        : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600')
                    }`}
                    onClick={() => setFilterMood('sad')}
                  >
                    <span className="text-lg">😢</span> Sad
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      filterMood === 'terrible' 
                        ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white') 
                        : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600')
                    }`}
                    onClick={() => setFilterMood('terrible')}
                  >
                    <span className="text-lg">😩</span> Terrible
                  </button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <div 
                    key={entry.id} 
                    className={`rounded-lg p-4 shadow transition-colors ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MoodIcon mood={entry.mood} size="md" />
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {entry.note}
                      </div>
                    </div>
                    <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm flex justify-between items-center`}>
                      <div>{formatDate(entry.date)}</div>
                      {entry.weather && (
                        <div className="flex items-center gap-2">
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {entry.weather.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <WeatherIcon condition={entry.weather.condition} />
                            <span>{entry.weather.temp}°C</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className={`col-span-2 text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {filterMood === 'all' 
                    ? 'No mood entries yet. Start tracking your mood!' 
                    : `No entries with mood: ${filterMood}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNotes;