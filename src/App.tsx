import { useState, useEffect, useMemo, useCallback } from 'react';
import { GeocodingLocation, OpenMeteoForecastResponse, TempUnit, SpeedUnit } from './types/weather';
import { getForecastData, getCityByCoords, POPULAR_CITIES } from './services/weatherApi';
import { generateIntelligenceReport } from './utils/weatherUtils';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FavoriteCitiesBar } from './components/FavoriteCitiesBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { RecommendationsPanel } from './components/RecommendationsPanel';
import { TempTrendChart } from './components/TempTrendChart';
import { HourlyForecastBar } from './components/HourlyForecastBar';
import { SevenDayForecast } from './components/SevenDayForecast';
import { ErrorMessage } from './components/ErrorMessage';
import { Loader2, RefreshCw, Compass } from 'lucide-react';

const DEFAULT_CITY = POPULAR_CITIES[1]; // London

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<GeocodingLocation>(() => {
    const saved = localStorage.getItem('wi_last_location');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return DEFAULT_CITY;
  });

  const [forecastData, setForecastData] = useState<OpenMeteoForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Units state
  const [tempUnit, setTempUnit] = useState<TempUnit>(() => {
    return (localStorage.getItem('wi_temp_unit') as TempUnit) || 'C';
  });

  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>(() => {
    return (localStorage.getItem('wi_speed_unit') as SpeedUnit) || 'km/h';
  });

  // Favorites state
  const [favorites, setFavorites] = useState<GeocodingLocation[]>(() => {
    const saved = localStorage.getItem('wi_favorites');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [POPULAR_CITIES[1], POPULAR_CITIES[0], POPULAR_CITIES[2]]; // Default favorites
  });

  // Save preference changes to localStorage
  useEffect(() => {
    localStorage.setItem('wi_temp_unit', tempUnit);
  }, [tempUnit]);

  useEffect(() => {
    localStorage.setItem('wi_speed_unit', speedUnit);
  }, [speedUnit]);

  useEffect(() => {
    localStorage.setItem('wi_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('wi_last_location', JSON.stringify(selectedLocation));
  }, [selectedLocation]);

  // Load weather for selected location
  const fetchWeather = useCallback(async (location: GeocodingLocation) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getForecastData(location.latitude, location.longitude);
      setForecastData(data);
    } catch (err) {
      console.error('Failed to load forecast data:', err);
      setError(`Unable to fetch weather data for "${location.name}". Please check network or try selecting another city.`);
      setForecastData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(selectedLocation);
  }, [selectedLocation, fetchWeather]);

  // Handle Geolocation
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const loc = await getCityByCoords(latitude, longitude);
          setSelectedLocation(loc);
        } catch (e) {
          setError('Failed to resolve city name for your GPS location.');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Geolocation permission denied. Please search for your city manually in the search bar.');
        } else {
          setError('Unable to retrieve your current location. Please try searching by city name.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Favorite toggle handler
  const handleToggleFavorite = () => {
    const exists = favorites.some((f) => f.id === selectedLocation.id || (f.name === selectedLocation.name && f.country === selectedLocation.country));
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== selectedLocation.id && f.name !== selectedLocation.name));
    } else {
      setFavorites([...favorites, selectedLocation]);
    }
  };

  const isCurrentFavorite = useMemo(() => {
    return favorites.some((f) => f.id === selectedLocation.id || (f.name === selectedLocation.name && f.country === selectedLocation.country));
  }, [favorites, selectedLocation]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  // Generate Intelligence Report
  const intelligenceReport = useMemo(() => {
    if (!forecastData) return null;
    return generateIntelligenceReport(forecastData);
  }, [forecastData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-white font-sans antialiased selection:bg-white/30 selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Header */}
      <Header
        tempUnit={tempUnit}
        speedUnit={speedUnit}
        onTempUnitChange={setTempUnit}
        onSpeedUnitChange={setSpeedUnit}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
        {/* Search Bar & Favorite Pills */}
        <div className="space-y-3">
          <SearchBar
            onSelectCity={setSelectedLocation}
            onUseMyLocation={handleUseMyLocation}
            isLocating={isLocating}
          />

          <FavoriteCitiesBar
            favorites={favorites}
            onSelectCity={setSelectedLocation}
            onRemoveFavorite={handleRemoveFavorite}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4 rounded-[36px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
            <Loader2 className="w-10 h-10 animate-spin text-amber-300" />
            <div className="text-center">
              <div className="font-light text-xl text-white">Retrieving Weather Intelligence</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-1">
                Fetching satellite & forecast data for {selectedLocation.name}...
              </div>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {!isLoading && error && (
          <ErrorMessage
            message={error}
            onRetry={() => fetchWeather(selectedLocation)}
            onSelectCity={setSelectedLocation}
          />
        )}

        {/* Forecast Content */}
        {!isLoading && !error && forecastData && intelligenceReport && (
          <div className="space-y-6">
            {/* Top Grid: Hero Current Weather & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <CurrentWeatherCard
                  location={selectedLocation}
                  data={forecastData}
                  tempUnit={tempUnit}
                  speedUnit={speedUnit}
                  isFavorite={isCurrentFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>

              <div className="lg:col-span-5">
                <RecommendationsPanel intelligence={intelligenceReport} />
              </div>
            </div>

            {/* Middle Grid: Hourly Scroll & Temperature Trend Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-12">
                <HourlyForecastBar data={forecastData} tempUnit={tempUnit} />
              </div>

              <div className="lg:col-span-12">
                <TempTrendChart data={forecastData} tempUnit={tempUnit} />
              </div>
            </div>

            {/* Bottom Grid: 7-Day Outlook */}
            <div className="grid grid-cols-1 gap-6">
              <SevenDayForecast data={forecastData} tempUnit={tempUnit} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-white/10 text-center text-xs text-white/60 space-y-1 backdrop-blur-lg bg-black/10 relative z-10">
        <div className="flex items-center justify-center gap-2 font-medium tracking-wider uppercase text-[11px]">
          <Compass className="w-3.5 h-3.5 text-amber-300" /> Open-Meteo Weather Intelligence Engine
        </div>
        <div className="text-white/40">
          Powered by Open-Meteo API • Realtime Global Mesh Network
        </div>
      </footer>
    </div>
  );
}
