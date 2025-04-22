import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import MoodSelector from '../components/MoodSelector';
import { useTheme } from '../context/ThemeContext';
import { useMood } from '../context/MoodContext';
import Header from '../components/Header';

const Home = () => {
  const [note, setNote] = useState('');
  const { addMoodEntry, selectedMood, setSelectedMood } = useMood();
  const { darkMode } = useTheme();
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleSave = () => {
    const success = addMoodEntry(selectedMood, note);
    if (success) {
      setSelectedMood(null);
      setNote('');
    }
  };

  const getBgColor = () => {
    if (darkMode) {
      return 'bg-gray-900';
    }
    
    const moodColors = {
      happy: 'bg-gradient-to-b from-yellow-300 to-yellow-100',
      neutral: 'bg-gradient-to-b from-orange-300 to-orange-100',
      meh: 'bg-gradient-to-b from-yellow-200 to-gray-100',
      sad: 'bg-gradient-to-b from-red-300 to-red-100',
      terrible: 'bg-gradient-to-b from-green-200 to-green-50'
    };
    
    return selectedMood ? moodColors[selectedMood] : 'bg-gradient-to-b from-orange-300 to-orange-200';
  };
  
  const getContentBg = () => {
    if (darkMode) {
      return 'bg-gray-800 text-white';
    }
    return 'bg-orange-50';
  };

  return (
    <div className={`min-h-screen ${getBgColor()} transition-colors duration-500`}>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className={`rounded-3xl shadow-lg overflow-hidden transition-colors duration-500 ${darkMode ? 'shadow-gray-700' : ''}`}>
          <Header />
          
          <div className={`p-6 ${getContentBg()} transition-colors duration-500`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} font-display`}>
                  {formattedDate}
                </h2>
                <p className={`text-xl text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-body`}>
                  How are you feeling today?
                </p>
                
                <div className="px-4 md:px-8">
                  <MoodSelector />
                </div>
                
                <div className="mt-8">
                  <textarea
                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                      darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-orange-50 text-gray-800 border-orange-200'
                    }`}
                    placeholder="Add a note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows="3"
                  />
                </div>
                
                <button
                  className={`w-full py-3 rounded-lg mt-4 transition duration-300 ${
                    darkMode 
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : 'bg-orange-400 text-white hover:bg-orange-500'
                  }`}
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
              
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;