import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import AllNotes from './pages/AllNotes';
import Stats from './pages/Stats';
import { MoodProvider } from './context/MoodContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <MoodProvider>
        <Router>
          <Toaster position="top-center" toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }} />
          <div className="min-h-screen w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-notes" element={<AllNotes />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </div>
        </Router>
      </MoodProvider>
    </ThemeProvider>
  );
}

export default App;