import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMood } from '../context/MoodContext';
import MoodIcon from './MoodIcon';

const Calendar = () => {
  const { darkMode } = useTheme();
  const { moodEntries } = useMood();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Functions to navigate between months
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Format current month and year
  const monthYearString = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get start day of month (0 = Sunday, 1 = Monday, etc)
  const getStartDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Calendar grid setup
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDayOfMonth(year, month);
  
  // Create blank days for start of month
  const blanks = Array(startDay).fill(null).map((_, i) => (
    <div key={`blank-${i}`} className="h-9"></div>
  ));
  
  // Find moods for each day of current month
  const getMoodForDay = (day) => {
    const date = new Date(year, month, day).toISOString().split('T')[0];
    const entriesForDay = moodEntries.filter(entry => 
      new Date(entry.date).toISOString().split('T')[0] === date
    );
    
    if (entriesForDay.length === 0) return null;
    
    // Return the first mood for simplicity
    return entriesForDay[0].mood;
  };
  
  // Create day components
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
    const mood = getMoodForDay(day);
    const isToday = 
      new Date().getDate() === day && 
      new Date().getMonth() === month && 
      new Date().getFullYear() === year;
    
    return (
      <div 
        key={`day-${day}`} 
        className={`h-9 flex items-center justify-center ${
          isToday ? 
            (darkMode ? 'bg-gray-700 rounded-full' : 'bg-orange-100 rounded-full') : 
            ''
        }`}
      >
        {mood ? (
          <MoodIcon mood={mood} size="sm" />
        ) : (
          <span className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
            {day}
          </span>
        )}
      </div>
    );
  });
  
  // Combine blanks and days
  const totalSlots = [...blanks, ...days];
  
  // Split into weeks
  const rows = [];
  let cells = [];
  
  totalSlots.forEach((day, i) => {
    if (i % 7 !== 0) {
      cells.push(day);
    } else {
      if (cells.length > 0) {
        rows.push(cells);
      }
      cells = [day];
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  return (
    <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white'} h-full flex flex-col`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {monthYearString}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className={`p-2 rounded ${darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-orange-100 text-gray-600 hover:bg-orange-200'} transition-colors`}
            aria-label="Previous month"
          >
            &lt;
          </button>
          <button 
            onClick={nextMonth}
            className={`p-2 rounded ${darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-orange-100 text-gray-600 hover:bg-orange-200'} transition-colors`}
            aria-label="Next month"
          >
            &gt;
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div 
            key={i} 
            className={`text-center text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 flex-grow">
        {rows.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <React.Fragment key={idx}>{day}</React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;