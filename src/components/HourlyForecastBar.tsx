import React from 'react';
import { OpenMeteoForecastResponse, TempUnit } from '../types/weather';
import { convertTemp, getWeatherCondition } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { Clock, Droplets } from 'lucide-react';

interface Props {
  data: OpenMeteoForecastResponse;
  tempUnit: TempUnit;
}

export const HourlyForecastBar: React.FC<Props> = ({ data, tempUnit }) => {
  const currentIso = data.current.time;
  const currentIdx = Math.max(0, data.hourly.time.findIndex((t) => t >= currentIso));

  const hoursToDisplay = data.hourly.time.slice(currentIdx, currentIdx + 24);

  return (
    <div className="rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 text-white shadow-2xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-white/20 text-amber-300 border border-white/30 backdrop-blur-md">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-light text-white tracking-tight">Hourly Forecast</h3>
          <p className="text-xs text-white/60 font-light">Next 24 hours weather timeline</p>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-white/20">
        {hoursToDisplay.map((timeStr, idx) => {
          const globalIdx = currentIdx + idx;
          const date = new Date(timeStr);
          const isNow = idx === 0;
          const timeLabel = isNow
            ? 'Now'
            : date.toLocaleTimeString([], { hour: 'numeric', hour12: true });

          const tempC = data.hourly.temperature_2m[globalIdx] ?? 0;
          const tempVal = convertTemp(tempC, tempUnit);
          const rainProb = data.hourly.precipitation_probability[globalIdx] ?? 0;
          const code = data.hourly.weather_code[globalIdx] ?? 0;
          const condition = getWeatherCondition(code, 1);

          return (
            <div
              key={timeStr}
              className={`flex flex-col items-center justify-between p-3.5 rounded-3xl shrink-0 w-24 text-center transition-all ${
                isNow
                  ? 'bg-white/25 border border-white/40 shadow-xl backdrop-blur-xl scale-105'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md'
              }`}
            >
              <span className={`text-xs ${isNow ? 'text-amber-300 font-bold uppercase tracking-wider' : 'text-white/70 font-light'}`}>
                {timeLabel}
              </span>

              <div className="my-2 p-2 rounded-2xl bg-white/10 text-amber-200 border border-white/15">
                <WeatherIcon name={condition.iconName} className="w-7 h-7" />
              </div>

              <span className="text-base font-light text-white">
                {tempVal}°
              </span>

              {rainProb > 0 ? (
                <span className="text-[10px] font-semibold text-sky-200 flex items-center gap-0.5 mt-1">
                  <Droplets className="w-2.5 h-2.5" /> {rainProb}%
                </span>
              ) : (
                <span className="text-[10px] text-white/40 font-light mt-1">0%</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
