import React from 'react';
import { OpenMeteoForecastResponse, TempUnit } from '../types/weather';
import { convertTemp, getWeatherCondition } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { CalendarDays, Droplets, Wind } from 'lucide-react';

interface Props {
  data: OpenMeteoForecastResponse;
  tempUnit: TempUnit;
}

export const SevenDayForecast: React.FC<Props> = ({ data, tempUnit }) => {
  const daily = data.daily;

  // Calculate global min and max across all 7 days for range bar scaling
  const allMaxs = daily.temperature_2m_max.map((t) => convertTemp(t, tempUnit));
  const allMins = daily.temperature_2m_min.map((t) => convertTemp(t, tempUnit));
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const tempSpan = Math.max(1, globalMax - globalMin);

  return (
    <div className="rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 text-white shadow-2xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-white/20 text-amber-300 border border-white/30 backdrop-blur-md">
          <CalendarDays className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-light text-white tracking-tight">7-Day Forecast</h3>
          <p className="text-xs text-white/60 font-light">Weekly weather outlook & temperature ranges</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {daily.time.map((timeStr, idx) => {
          const date = new Date(timeStr);
          const isToday = idx === 0;

          const dayName = isToday
            ? 'Today'
            : date.toLocaleDateString([], { weekday: 'short' });

          const dateLabel = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

          const code = daily.weather_code[idx] ?? 0;
          const condition = getWeatherCondition(code, 1);

          const maxTemp = convertTemp(daily.temperature_2m_max[idx] ?? 0, tempUnit);
          const minTemp = convertTemp(daily.temperature_2m_min[idx] ?? 0, tempUnit);
          const rainProb = daily.precipitation_probability_max[idx] ?? 0;
          const windMax = Math.round(daily.wind_speed_10m_max[idx] ?? 0);

          // Calculate range bar offset and width percentages
          const leftPercent = Math.max(0, Math.min(100, ((minTemp - globalMin) / tempSpan) * 100));
          const widthPercent = Math.max(8, Math.min(100 - leftPercent, ((maxTemp - minTemp) / tempSpan) * 100));

          return (
            <div
              key={timeStr}
              className={`p-3.5 sm:p-4 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                isToday
                  ? 'bg-white/20 border border-white/30 shadow-lg backdrop-blur-xl'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md'
              }`}
            >
              {/* Left Day & Date */}
              <div className="flex items-center gap-3 min-w-36">
                <div className="p-2 rounded-2xl bg-white/10 text-amber-200 shrink-0 border border-white/20">
                  <WeatherIcon name={condition.iconName} className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                    {dayName}
                    {isToday && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-bold">
                        Now
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/60 font-light">{dateLabel}</div>
                </div>
              </div>

              {/* Middle Condition & Rain */}
              <div className="flex items-center justify-between sm:justify-start gap-4 text-xs font-light text-white/80 w-full sm:w-auto">
                <div className="capitalize font-medium text-white truncate max-w-28 sm:max-w-36">
                  {condition.label}
                </div>

                <div className="flex items-center gap-3 text-white/60 shrink-0">
                  <span className="flex items-center gap-1 text-sky-200 font-semibold">
                    <Droplets className="w-3.5 h-3.5" /> {rainProb}%
                  </span>
                  <span className="flex items-center gap-1 text-white/60 hidden md:flex font-light">
                    <Wind className="w-3.5 h-3.5" /> {windMax} km/h
                  </span>
                </div>
              </div>

              {/* Right Min-Max Temp & Bar Visualizer */}
              <div className="flex items-center gap-3 w-full sm:w-48 justify-end shrink-0">
                <span className="text-xs font-semibold text-sky-200 w-8 text-right">
                  {minTemp}°
                </span>

                {/* Range Bar */}
                <div className="relative flex-1 h-2 rounded-full bg-white/10 overflow-hidden border border-white/10">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-300 via-amber-300 to-rose-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-semibold text-rose-300 w-8 text-left">
                  {maxTemp}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
