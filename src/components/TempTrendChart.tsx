import React, { useState } from 'react';
import { OpenMeteoForecastResponse, TempUnit } from '../types/weather';
import { convertTemp, getWeatherCondition } from '../utils/weatherUtils';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Clock, CalendarDays } from 'lucide-react';

interface Props {
  data: OpenMeteoForecastResponse;
  tempUnit: TempUnit;
}

export const TempTrendChart: React.FC<Props> = ({ data, tempUnit }) => {
  const [viewMode, setViewMode] = useState<'24h' | '7d'>('24h');

  // Prepare 24-hour chart data (next 24 hours starting from current hour)
  const currentIso = data.current.time;
  const currentIdx = Math.max(0, data.hourly.time.findIndex((t) => t >= currentIso));
  const hourly24Time = data.hourly.time.slice(currentIdx, currentIdx + 24);
  const hourly24Temp = data.hourly.temperature_2m.slice(currentIdx, currentIdx + 24);
  const hourly24Rain = data.hourly.precipitation_probability.slice(currentIdx, currentIdx + 24);
  const hourly24Codes = data.hourly.weather_code.slice(currentIdx, currentIdx + 24);

  const chartData24h = hourly24Time.map((timeStr, idx) => {
    const date = new Date(timeStr);
    const label = date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    const tempC = hourly24Temp[idx] ?? 0;
    const tempConverted = convertTemp(tempC, tempUnit);
    const rainProb = hourly24Rain[idx] ?? 0;
    const condition = getWeatherCondition(hourly24Codes[idx] ?? 0, 1);

    return {
      time: label,
      rawTime: timeStr,
      temp: tempConverted,
      rain: rainProb,
      conditionLabel: condition.label,
    };
  });

  // Prepare 7-day chart data
  const chartData7d = data.daily.time.map((timeStr, idx) => {
    const date = new Date(timeStr);
    const isToday = idx === 0;
    const label = isToday
      ? 'Today'
      : date.toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric' });

    const maxC = data.daily.temperature_2m_max[idx] ?? 0;
    const minC = data.daily.temperature_2m_min[idx] ?? 0;
    const maxTemp = convertTemp(maxC, tempUnit);
    const minTemp = convertTemp(minC, tempUnit);
    const rainProb = data.daily.precipitation_probability_max[idx] ?? 0;

    return {
      time: label,
      high: maxTemp,
      low: minTemp,
      rain: rainProb,
    };
  });

  return (
    <div className="rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 text-white shadow-2xl space-y-4">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/20 text-amber-300 border border-white/30 backdrop-blur-md">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-light text-white tracking-tight">Temperature Trend</h3>
            <p className="text-xs text-white/60 font-light">
              {viewMode === '24h'
                ? 'Hourly temperature trajectory & precipitation probability'
                : '7-Day high & low temperature range comparison'}
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold">
          <button
            onClick={() => setViewMode('24h')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              viewMode === '24h'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> 24 Hours
          </button>
          <button
            onClick={() => setViewMode('7d')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              viewMode === '7d'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" /> 7 Days
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === '24h' ? (
            <AreaChart data={chartData24h} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.15} vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff" opacity={0.7} fontSize={11} tickLine={false} />
              <YAxis
                yAxisId="left"
                stroke="#ffffff"
                opacity={0.8}
                fontSize={11}
                tickLine={false}
                unit={`°${tempUnit}`}
                domain={['auto', 'auto']}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#38bdf8"
                fontSize={11}
                tickLine={false}
                unit="%"
                domain={[0, 100]}
                hide={true}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-slate-900/90 border border-white/20 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl text-xs space-y-1 text-white">
                        <div className="font-semibold text-white">{label} ({item.conditionLabel})</div>
                        <div className="text-amber-200 font-semibold flex items-center gap-1">
                          Temperature: {item.temp}°{tempUnit}
                        </div>
                        <div className="text-sky-300 flex items-center gap-1">
                          Rain probability: {item.rain}%
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="temp"
                name="Temperature"
                stroke="#ffffff"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="rain"
                name="Rain Prob %"
                stroke="#38bdf8"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fillOpacity={0.5}
                fill="url(#rainGradient)"
              />
            </AreaChart>
          ) : (
            <AreaChart data={chartData7d} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="highTempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="lowTempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.15} vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff" opacity={0.7} fontSize={11} tickLine={false} />
              <YAxis
                stroke="#ffffff"
                opacity={0.8}
                fontSize={11}
                tickLine={false}
                unit={`°${tempUnit}`}
                domain={['auto', 'auto']}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-slate-900/90 border border-white/20 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl text-xs space-y-1 text-white">
                        <div className="font-semibold text-white">{label}</div>
                        <div className="text-rose-300 font-semibold">Max Temp: {item.high}°{tempUnit}</div>
                        <div className="text-sky-300 font-semibold">Min Temp: {item.low}°{tempUnit}</div>
                        <div className="text-amber-200">Rain Prob: {item.rain}%</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey="high"
                name="High Temp"
                stroke="#f43f5e"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#highTempGrad)"
              />
              <Area
                type="monotone"
                dataKey="low"
                name="Low Temp"
                stroke="#38bdf8"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#lowTempGrad)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/60 border-t border-white/10 pt-3 px-1 font-light">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white inline-block shadow" /> Temperature
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-300 inline-block shadow" /> Rain Probability %
        </span>
        {viewMode === '7d' && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block shadow" /> Daily Max
          </span>
        )}
      </div>
    </div>
  );
};
