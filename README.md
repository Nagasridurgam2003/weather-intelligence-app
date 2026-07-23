# Weather Intelligence App

A modern, responsive Weather Intelligence web application built with **React**, **TypeScript**, and **Vite**, powered by the free open-source **Open-Meteo API**. No API keys required!

## 🌟 Key Features

- **City Search with Auto-Complete**: Search any city worldwide powered by Open-Meteo Geocoding API with instant debounce suggestions.
- **Current GPS Location**: Auto-detect user coordinates via browser Geolocation API with reverse geocoding fallback.
- **Current Atmospheric Metrics**:
  - Temperature & "Feels Like" heat index
  - WMO Weather Condition interpretation with atmospheric dynamic themes
  - Wind speed, direction compass, and gusts
  - Relative Humidity % and Dew Point estimate
  - UV Index with level guidance (Low to Extreme)
  - Surface Pressure (hPa) & Cloud Cover %
  - Sunrise & Sunset times
- **Planning Intelligence Engine**:
  - **Umbrella Recommendation**: Clear advice based on precipitation probability and rainfall sums.
  - **Travel & Road Safety Index**: Safety rating score (0–100) and road condition warnings.
  - **Outdoor Activity Ratings**: Evaluates suitability for Running, Cycling, Patio Dining, Hiking, and Stargazing/Sightseeing.
  - **Clothing & Packing Guide**: Dynamic outfit suggestions based on temperature and wind chill.
- **Interactive Temperature Trend Chart**: Visualized using **Recharts** with toggles between 24-hour timeline and 7-day high/low comparison.
- **24-Hour Hourly Timeline**: Scrollable strip showing hourly temperature, weather icons, and rain probability.
- **7-Day Forecast Outlook**: Detailed cards with max/min temperature range bar visualizer.
- **Unit Customization**: Seamless toggling between **°C / °F** for temperature and **km/h / mph** for wind speed.
- **Favorite Cities Management**: Save and manage favorite cities persisted in `localStorage`.
- **Graceful Error Handling**: Friendly error banners for unrecognized cities with quick selection of major world capitals.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data Source**: Open-Meteo Geocoding & Forecast APIs (Free, no API key required)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 🌐 APIs Used

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast API**: `https://api.open-meteo.com/v1/forecast`
- **Reverse Geocoding**: `https://api.bigdatacloud.net/data/reverse-geocode-client`

No API keys are needed to run or deploy this application.
Link: [https://weather-intelligence-app.nagasri-durgam.workers.dev/](https://weather-intelligence-app.nagasri-durgam.workers.dev/)
