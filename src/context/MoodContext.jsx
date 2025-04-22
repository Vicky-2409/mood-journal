
// File: src/context/MoodContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [moodEntries, setMoodEntries] = useState(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  
  const [weather, setWeather] = useState({ temp: null, condition: null });
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  
  // Filter states
  const [filterMood, setFilterMood] = useState('all');

  useEffect(() => {
    // Save entries to localStorage whenever they change
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        error => {
          console.error("Error getting location:", error);
          // Use default location if permission denied
          setLocation({ lat: 40.7128, lon: -74.0060 }); // New York as default
          toast.error("Location access denied. Using default location.");
        }
      );
    }
  }, []);

  useEffect(() => {
    // Fetch weather data when location is available
    if (location) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
          );
          
          setWeather({
            temp: Math.round(response.data.main.temp),
            condition: response.data.weather[0].main,
            icon: response.data.weather[0].icon
          });
          
          setLocationName(response.data.name);
        } catch (error) {
          console.error("Error fetching weather:", error);
          setWeather({ temp: 25, condition: 'Clear', icon: '01d' }); // Default weather
          setLocationName('Unknown Location');
          toast.error("Could not fetch weather data.");
        }
      };

      fetchWeather();
    }
  }, [location]);

  const addMoodEntry = (mood, note) => {
    if (!mood) {
      toast.error("Please select a mood before saving");
      return false;
    }
    
    if (!note.trim()) {
      toast.error("Please add a note about your mood");
      return false;
    }
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood,
      note,
      weather: { ...weather, location: locationName }
    };
    
    setMoodEntries(prev => [newEntry, ...prev]);
    toast.success("Mood saved successfully!");
    return true;
  };

  const getFilteredEntries = () => {
    if (filterMood === 'all') {
      return moodEntries;
    }
    return moodEntries.filter(entry => entry.mood === filterMood);
  };

  // Export entries as CSV
  const exportToCSV = () => {
    if (moodEntries.length === 0) {
      toast.error("No entries to export");
      return;
    }
    
    const headers = ["Date", "Mood", "Note", "Temperature", "Weather", "Location"];
    
    const csvContent = [
      headers.join(','),
      ...moodEntries.map(entry => [
        new Date(entry.date).toLocaleString(),
        entry.mood,
        `"${entry.note.replace(/"/g, '""')}"`,
        `${entry.weather.temp}°C`,
        entry.weather.condition,
        entry.weather.location || 'Unknown'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `moodmate_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Exported entries to CSV");
  };
  
  // Calculate mood statistics for trends
  const getMoodStats = () => {
    if (moodEntries.length === 0) return { counts: {}, percentages: {} };
    
    const moodCounts = {
      happy: 0,
      neutral: 0,
      meh: 0,
      sad: 0,
      terrible: 0
    };
    
    moodEntries.forEach(entry => {
      if (moodCounts.hasOwnProperty(entry.mood)) {
        moodCounts[entry.mood]++;
      }
    });
    
    const total = moodEntries.length;
    const moodPercentages = {};
    
    Object.keys(moodCounts).forEach(mood => {
      moodPercentages[mood] = Math.round((moodCounts[mood] / total) * 100);
    });
    
    return {
      counts: moodCounts,
      percentages: moodPercentages
    };
  };
  
  // Group entries by date for weekly/monthly trends
  const getMoodTrends = (period = 'week') => {
    if (moodEntries.length === 0) return [];
    
    const today = new Date();
    let startDate;
    
    if (period === 'week') {
      startDate = new Date();
      startDate.setDate(today.getDate() - 7);
    } else if (period === 'month') {
      startDate = new Date();
      startDate.setMonth(today.getMonth() - 1);
    } else {
      startDate = new Date(0); // All time
    }
    
    // Filter entries within the selected period
    const filteredEntries = moodEntries.filter(entry => 
      new Date(entry.date) >= startDate
    );
    
    // Group by date
    const entriesByDate = {};
    filteredEntries.forEach(entry => {
      const dateKey = new Date(entry.date).toISOString().split('T')[0];
      if (!entriesByDate[dateKey]) {
        entriesByDate[dateKey] = [];
      }
      entriesByDate[dateKey].push(entry);
    });
    
    // Convert to array for chart data
    const trendData = Object.keys(entriesByDate).map(date => {
      const entries = entriesByDate[date];
      const moodValues = {
        happy: 5,
        neutral: 4,
        meh: 3,
        sad: 2,
        terrible: 1
      };
      
      // Calculate average mood for the day
      const totalMoodValue = entries.reduce((sum, entry) => {
        return sum + (moodValues[entry.mood] || 3);
      }, 0);
      
      const avgMood = totalMoodValue / entries.length;
      
      return {
        date,
        displayDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        avgMood,
        entries: entries.length
      };
    });
    
    // Sort by date
    return trendData.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <MoodContext.Provider 
      value={{ 
        moodEntries, 
        addMoodEntry, 
        weather, 
        locationName,
        selectedMood,
        setSelectedMood,
        filterMood,
        setFilterMood,
        getFilteredEntries,
        exportToCSV,
        getMoodStats,
        getMoodTrends
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

// Custom hook for using the mood context
export const useMood = () => {
  const context = React.useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
