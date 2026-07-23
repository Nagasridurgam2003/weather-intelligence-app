import React from 'react';
import { TempUnit, SpeedUnit } from '../types/weather';
import { CloudSun, Sparkles } from 'lucide-react';

interface Props {
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
  onTempUnitChange: (unit: TempUnit) => void;
  onSpeedUnitChange: (unit: SpeedUnit) => void;
}

export const Header: React.FC<Props> = ({
  tempUnit,
  speedUnit,
  onTempUnitChange,
  onSpeedUnitChange,
}) => {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-6 bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-30 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
          <CloudSun className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-light tracking-tight text-white drop-shadow">
              Weather Intelligence
            </h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-300 border border-white/20">
              <Sparkles className="w-2.5 h-2.5" /> Optimal
            </span>
          </div>
          <p className="text-xs text-white/60 hidden sm:block font-light">
            Smart forecast analytics & outdoor planning intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Temperature Unit Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <button
            onClick={() => onTempUnitChange('C')}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
              tempUnit === 'C'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => onTempUnitChange('F')}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
              tempUnit === 'F'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            °F
          </button>
        </div>

        {/* Speed Unit Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <button
            onClick={() => onSpeedUnitChange('km/h')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition-all ${
              speedUnit === 'km/h'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            km/h
          </button>
          <button
            onClick={() => onSpeedUnitChange('mph')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition-all ${
              speedUnit === 'mph'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            mph
          </button>
        </div>
      </div>
    </header>
  );
};
