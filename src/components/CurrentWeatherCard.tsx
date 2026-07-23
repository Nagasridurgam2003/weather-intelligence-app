import React from 'react';
import { GeocodingLocation, OpenMeteoForecastResponse, TempUnit, SpeedUnit } from '../types/weather';
import {
  getWeatherCondition,
  convertTemp,
  convertSpeed,
  getWindDirectionLabel,
  getUVInfo,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import {
  Wind,
  Droplets,
  Sun,
  Gauge,
  Cloud,
  Sunrise,
  Sunset,
  Heart,
  Calendar,
  Compass,
  Thermometer,
} from 'lucide-react';

interface Props {
  location: GeocodingLocation;
  data: OpenMeteoForecastResponse;
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const CurrentWeatherCard: React.FC<Props> = ({
  location,
  data,
  tempUnit,
  speedUnit,
  isFavorite,
  onToggleFavorite,
}) => {
  const current = data.current;
  const todayDaily = data.daily;

  const condition = getWeatherCondition(current.weather_code, current.is_day);

  const currentTemp = convertTemp(current.temperature_2m, tempUnit);
  const feelsLike = convertTemp(current.apparent_temperature, tempUnit);
  const maxTemp = convertTemp(todayDaily.temperature_2m_max[0] ?? current.temperature_2m, tempUnit);
  const minTemp = convertTemp(todayDaily.temperature_2m_min[0] ?? current.temperature_2m, tempUnit);

  const windSpeed = convertSpeed(current.wind_speed_10m, speedUnit);
  const windDir = getWindDirectionLabel(current.wind_direction_10m);
  const uvIndex = todayDaily.uv_index_max[0] ?? 0;
  const uvInfo = getUVInfo(uvIndex);

  // Format Sunrise and Sunset
  const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '--:--';
    }
  };

  const sunriseStr = formatTime(todayDaily.sunrise[0]);
  const sunsetStr = formatTime(todayDaily.sunset[0]);

  return (
    <div className="relative overflow-hidden rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 text-white shadow-2xl transition-all duration-500 flex flex-col justify-between h-full">
      {/* Decorative ambient glowing radial light */}
      <div className="absolute -right-16 -top-16 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white drop-shadow">
              {location.name}
            </h2>
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-full transition-all ${
                isFavorite
                  ? 'bg-rose-500/80 text-white shadow-lg shadow-rose-500/30 scale-105 border border-rose-300/40'
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/20'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorite cities'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          <p className="text-xs font-light text-white/70 uppercase tracking-widest mt-1">
            {[location.admin1, location.country].filter(Boolean).join(', ')}
          </p>
          <div className="flex items-center gap-2 mt-2 text-[11px] uppercase tracking-widest text-white/60 font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            {new Date().toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Condition Icon */}
        <div className="p-4 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-xl shrink-0">
          <WeatherIcon name={condition.iconName} className="w-12 h-12 sm:w-16 sm:h-16 text-amber-200" />
        </div>
      </div>

      {/* Temperature Display Row */}
      <div className="my-6 sm:my-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl sm:text-8xl font-extralight tracking-tighter drop-shadow-xl">
              {currentTemp}°
            </span>
            <span className="text-3xl sm:text-4xl font-light text-white/50">
              {tempUnit}
            </span>
          </div>
          <p className="text-lg sm:text-xl font-light text-white/90 capitalize mt-1 tracking-wide">
            {condition.label}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-1.5 bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
          <div className="text-xs text-white/70 font-light flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-amber-300" /> Feels like: <span className="font-semibold text-white">{feelsLike}°{tempUnit}</span>
          </div>
          <div className="text-xs text-white/70 font-light">
            High: <span className="font-semibold text-rose-300">{maxTemp}°</span> / Low: <span className="font-semibold text-sky-200">{minTemp}°</span>
          </div>
        </div>
      </div>

      {/* Atmospheric Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 relative z-10 text-xs">
        {/* Wind */}
        <div className="p-3.5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-white/10 text-sky-300">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Wind</div>
            <div className="font-medium text-sm text-white mt-0.5">
              {windSpeed} <span className="text-xs text-white/60 font-light">{speedUnit}</span>
            </div>
            <div className="text-[10px] text-white/60 flex items-center gap-1">
              <Compass className="w-2.5 h-2.5" /> {windDir}
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-3.5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-white/10 text-blue-300">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Humidity</div>
            <div className="font-medium text-sm text-white mt-0.5">
              {current.relative_humidity_2m} <span className="text-xs text-white/60">%</span>
            </div>
            <div className="text-[10px] text-white/60">
              Dew ~{Math.round(current.temperature_2m - (100 - current.relative_humidity_2m) / 5)}°C
            </div>
          </div>
        </div>

        {/* UV Index */}
        <div className="p-3.5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-white/10 text-amber-300">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">UV Index</div>
            <div className="font-medium text-sm text-white mt-0.5">
              {uvIndex.toFixed(1)}
            </div>
            <div className="text-[10px] font-semibold text-amber-300">
              {uvInfo.level}
            </div>
          </div>
        </div>

        {/* Pressure */}
        <div className="p-3.5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-white/10 text-purple-300">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Pressure</div>
            <div className="font-medium text-sm text-white mt-0.5">
              {Math.round(current.surface_pressure || current.pressure_msl)} <span className="text-[10px] text-white/60">hPa</span>
            </div>
            <div className="text-[10px] text-white/60 flex items-center gap-1">
              <Cloud className="w-2.5 h-2.5" /> {current.cloud_cover}%
            </div>
          </div>
        </div>
      </div>

      {/* Sun Times Bar */}
      <div className="mt-3 p-3 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-around text-xs relative z-10">
        <div className="flex items-center gap-2">
          <Sunrise className="w-4 h-4 text-amber-300" />
          <div>
            <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Sunrise:</span>{' '}
            <span className="font-medium text-white">{sunriseStr}</span>
          </div>
        </div>
        <div className="h-4 w-px bg-white/20" />
        <div className="flex items-center gap-2">
          <Sunset className="w-4 h-4 text-orange-300" />
          <div>
            <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Sunset:</span>{' '}
            <span className="font-medium text-white">{sunsetStr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
