import React from 'react';
import { GeocodingLocation } from '../types/weather';
import { POPULAR_CITIES } from '../services/weatherApi';
import { AlertTriangle, RefreshCw, MapPin } from 'lucide-react';

interface Props {
  message: string;
  onRetry?: () => void;
  onSelectCity: (city: GeocodingLocation) => void;
}

export const ErrorMessage: React.FC<Props> = ({
  message,
  onRetry,
  onSelectCity,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-slate-900/90 border border-amber-500/30 p-6 shadow-2xl space-y-4 my-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-100">Location Not Found</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-400 font-medium">
          Try selecting one of these major world cities:
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {POPULAR_CITIES.slice(0, 4).map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors shrink-0"
            >
              <MapPin className="w-3 h-3 text-sky-400" />
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </div>

      {onRetry && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-semibold transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Request
          </button>
        </div>
      )}
    </div>
  );
};
