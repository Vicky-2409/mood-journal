// File: src/pages/Stats.jsx
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useMood } from '../context/MoodContext';
import Header from '../components/Header';
import MoodIcon from '../components/MoodIcon';

const Stats = () => {
  const { darkMode } = useTheme();
  const { getMoodStats, getMoodTrends } = useMood();
  const [chartView, setChartView] = useState('distribution'); // 'distribution' or 'trend'
  const [trendPeriod, setTrendPeriod] = useState('week'); // 'week' or 'month'
  
  const moodStats = getMoodStats();
  const moodTrends = getMoodTrends(trendPeriod);
  
  const distributionData = Object.keys(moodStats.counts).map(mood => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    count: moodStats.counts[mood],
    percentage: moodStats.percentages[mood]
  }));
  
  const getBgColor = () => {
    if (darkMode) {
      return 'bg-gray-900';
    }
    return 'bg-gradient-to-b from-orange-300 to-orange-200';
  };

  const getChartColors = () => {
    if (darkMode) {
      return {
        happy: '#FBBF24', // yellow-400
        neutral: '#FB923C', // orange-400
        meh: '#D4D4D4', // gray-300
        sad: '#F87171', // red-400
        terrible: '#4ADE80', // green-400
        line: '#F97316', // orange-500
        text: '#F3F4F6', // gray-100
        grid: '#4B5563', // gray-600
        background: '#1F2937', // gray-800
      };
    }
    
    return {
      happy: '#FBBF24', // yellow-400
      neutral: '#FB923C', // orange-400
      meh: '#9CA3AF', // gray-400
      sad: '#EF4444', // red-500
      terrible: '#10B981', // green-500
      line: '#EA580C', // orange-600
      text: '#1F2937', // gray-800
      grid: '#E5E7EB', // gray-200
      background: '#FFF7ED', // orange-50
    };
  };

  const chartColors = getChartColors();

  return (
    <div className={`min-h-screen ${getBgColor()} transition-colors duration-500`}>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className={`rounded-3xl shadow-lg overflow-hidden ${darkMode ? 'shadow-gray-700' : ''}`}>
          <Header />
          
          <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-orange-50'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} font-display`}>
                Mood Statistics
              </h2>
              
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    chartView === 'distribution' 
                      ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white')
                      : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-orange-100 text-gray-700')
                  }`}
                  onClick={() => setChartView('distribution')}
                >
                  <FaChartBar /> Distribution
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    chartView === 'trend' 
                      ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white')
                      : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-orange-100 text-gray-700')
                  }`}
                  onClick={() => setChartView('trend')}
                >
                  <FaChartLine /> Trends
                </button>
              </div>
            </div>
            
            {chartView === 'distribution' ? (
              <div className={`bg-opacity-50 rounded-xl p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Mood Distribution
                </h3>
                
                {distributionData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={distributionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis 
                          dataKey="name" 
                          stroke={chartColors.text}
                          tick={{ fill: chartColors.text }}
                        />
                        <YAxis 
                          stroke={chartColors.text}
                          tick={{ fill: chartColors.text }}
                        />
                        <Tooltip 
                          formatter={(value, name) => [`${value} entries`, name]}
                          contentStyle={{ 
                            backgroundColor: darkMode ? '#374151' : '#FFFFFF',
                            color: darkMode ? '#F3F4F6' : '#1F2937',
                            border: `1px solid ${darkMode ? '#4B5563' : '#E5E7EB'}`
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          fill={chartColors.line} 
                          animationDuration={1000}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className={`flex items-center justify-center h-64 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No mood data available yet
                  </div>
                )}
                
                <div className="grid grid-cols-5 gap-2 mt-6">
                  {Object.keys(moodStats.counts).map(mood => (
                    <div 
                      key={mood}
                      className={`rounded-lg p-3 flex flex-col items-center ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}
                    >
                      <MoodIcon mood={mood} size="md" />
                      <div className={`text-sm font-medium mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {moodStats.counts[mood]} entries ({moodStats.percentages[mood]}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`bg-opacity-50 rounded-xl p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Mood Trends
                  </h3>
                  
                  <div className="flex gap-2">
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${
                        trendPeriod === 'week' 
                          ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white')
                          : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600')
                      }`}
                      onClick={() => setTrendPeriod('week')}
                    >
                      Week
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${
                        trendPeriod === 'month' 
                          ? (darkMode ? 'bg-gray-600 text-white' : 'bg-orange-400 text-white')
                          : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600')
                      }`}
                      onClick={() => setTrendPeriod('month')}
                    >
                      Month
                    </button>
                  </div>
                </div>
                
                {moodTrends.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={moodTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis 
                          dataKey="displayDate" 
                          stroke={chartColors.text}
                          tick={{ fill: chartColors.text }}
                        />
                        <YAxis 
                          domain={[1, 5]} 
                          ticks={[1, 2, 3, 4, 5]} 
                          stroke={chartColors.text}
                          tick={{ fill: chartColors.text }}
                          tickFormatter={(value) => {
                            const moodNames = {
                              1: 'Terrible',
                              2: 'Sad',
                              3: 'Meh',
                              4: 'Neutral',
                              5: 'Happy'
                            };
                            return moodNames[value] || value;
                          }}
                        />
                        <Tooltip 
                          formatter={(value, name) => [
                            `${value.toFixed(1)} (${['Terrible', 'Sad', 'Meh', 'Neutral', 'Happy'][Math.round(value) - 1]})`, 
                            'Average Mood'
                          ]}
                          contentStyle={{ 
                            backgroundColor: darkMode ? '#374151' : '#FFFFFF',
                            color: darkMode ? '#F3F4F6' : '#1F2937',
                            border: `1px solid ${darkMode ? '#4B5563' : '#E5E7EB'}`
                          }}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="avgMood" 
                          stroke={chartColors.line} 
                          strokeWidth={2}
                          dot={{ fill: chartColors.line, strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, fill: chartColors.line }}
                          animationDuration={1000}
                        />
                        <Legend wrapperStyle={{ color: chartColors.text }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className={`flex items-center justify-center h-64 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No trend data available for this period
                  </div>
                )}
                
                <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    This chart shows your average mood over time. Higher values indicate more positive moods.
                    {moodTrends.length > 0 && (
                      <>
                      <br />
                      <span className="font-medium">
                        Tip: You recorded moods on {moodTrends.length} different days in this period.
                      </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;