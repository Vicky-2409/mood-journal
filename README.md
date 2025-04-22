# MoodMate - Interactive Mood Journal with Weather Integration

MoodMate is a responsive web application that allows users to track their daily moods alongside weather data. This project demonstrates front-end development skills with React, including API integration, data visualization, and responsive design.

## Features

- 📱 Responsive design for mobile and desktop
- 😊 Daily mood tracking with 5 different mood options
- 🌤️ Real-time weather integration using geolocation
- 📝 Note-taking for daily journal entries
- 📊 Visualization of mood trends over time
- 🌙 Dark mode support
- 📅 Calendar view for past entries
- 🔍 Filter entries by mood
- 📤 Export entries as CSV or PDF

## Tech Stack

- React 18
- Tailwind CSS for styling
- Chart.js for data visualization
- Axios for API requests
- jsPDF for PDF exports
- Local Storage for data persistence

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/moodmate.git
   cd moodmate
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Add your OpenWeatherMap API key
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get an API key
   - In `App.jsx`, replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key

4. Start the development server
   ```
   npm run dev
   ```

5. Build for production
   ```
   npm run build
   ```

## Usage

- Select your mood from the emoji options
- Add a note about your day
- Save your entry to store it with current weather data
- View past entries in the Journal tab
- See mood trends and insights in the Trends tab
- Export your journal as CSV or PDF

## Deployment

This app can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static site hosting service

## Project Structure

```
moodmate/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── DailyView.jsx
│   │   ├── Header.jsx
│   │   ├── NotesView.jsx
│   │   ├── Notification.jsx
│   │   └── TrendsView.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useLocalStorage.js
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html           # HTML template
└── package.json         # Dependencies and scripts
```

## License

MIT
