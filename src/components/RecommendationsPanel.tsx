import React, { useState } from 'react';
import { IntelligenceReport } from '../types/weather';
import {
  Umbrella,
  Car,
  Footprints,
  Bike,
  Utensils,
  Mountain,
  Sparkles,
  Camera,
  Shirt,
  ShieldAlert,
  Sun,
  Info,
} from 'lucide-react';

interface Props {
  intelligence: IntelligenceReport;
}

export const RecommendationsPanel: React.FC<Props> = ({ intelligence }) => {
  const [activeTab, setActiveTab] = useState<'umbrella' | 'travel' | 'activities' | 'clothing'>('umbrella');

  const { umbrella, travel, activities, clothing, uvGuide } = intelligence;

  // Icon mapping helper
  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints':
        return <Footprints className="w-5 h-5" />;
      case 'Bike':
        return <Bike className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Mountain':
        return <Mountain className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Camera':
        return <Camera className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  const getRatingBadgeClass = (rating: string) => {
    switch (rating) {
      case 'Excellent':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Good':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'Fair':
      case 'Moderate':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Challenging':
      case 'Poor':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      case 'Hazardous':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 text-white shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/20 text-amber-300 border border-white/30 backdrop-blur-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-light text-white tracking-tight">Intelligence & Outdoor Planning</h3>
            <p className="text-xs text-white/60 font-light">
              Smart recommendations for umbrella, travel safety, activities & attire
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('umbrella')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'umbrella'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Umbrella className="w-3.5 h-3.5" /> Umbrella
          </button>
          <button
            onClick={() => setActiveTab('travel')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'travel'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> Travel
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'activities'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" /> Activities
          </button>
          <button
            onClick={() => setActiveTab('clothing')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'clothing'
                ? 'bg-white/30 text-white shadow-md border border-white/30'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" /> Clothing
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {/* 1. UMBRELLA ADVICE TAB */}
        {activeTab === 'umbrella' && (
          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3.5 rounded-2xl backdrop-blur-md ${
                    umbrella.needed
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-300/30'
                      : 'bg-emerald-400/20 text-emerald-300 border border-emerald-300/30'
                  }`}
                >
                  <Umbrella className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-bold uppercase tracking-widest">Umbrella Status</div>
                  <div className="text-xl font-light text-white flex items-center gap-2 mt-0.5">
                    {umbrella.level}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-white/60 font-bold uppercase tracking-widest">Rain Risk</div>
                <div className="text-3xl font-extralight text-sky-200">{umbrella.probability}%</div>
              </div>
            </div>

            <p className="text-sm text-white/80 font-light leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
              <span>{umbrella.reason}</span>
            </p>
          </div>
        )}

        {/* 2. TRAVEL INDEX TAB */}
        {activeTab === 'travel' && (
          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-white/10 text-sky-200 border border-white/20">
                  <Car className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-bold uppercase tracking-widest">Travel & Road Safety</div>
                  <div className="text-lg font-light text-white mt-0.5">{travel.summary}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-white/60 font-bold uppercase tracking-widest">Safety Index</div>
                <div className="text-3xl font-extralight text-emerald-300">{travel.score}/100</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 font-light">Rating:</span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${getRatingBadgeClass(
                  travel.rating
                )}`}
              >
                {travel.rating}
              </span>
            </div>

            <p className="text-sm text-white/80 font-light bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>{travel.advice}</span>
            </p>
          </div>
        )}

        {/* 3. OUTDOOR ACTIVITIES TAB */}
        {activeTab === 'activities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activities.map((act) => (
              <div
                key={act.name}
                className="p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2.5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-2xl bg-white/10 text-amber-300">
                      {getActivityIcon(act.icon)}
                    </div>
                    <div className="font-light text-white text-sm">{act.name}</div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getRatingBadgeClass(
                      act.rating
                    )}`}
                  >
                    {act.rating} ({act.score}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-300 to-amber-300"
                    style={{ width: `${act.score}%` }}
                  />
                </div>

                <p className="text-xs text-white/60 font-light">{act.reason}</p>
              </div>
            ))}
          </div>
        )}

        {/* 4. CLOTHING & PACKING TAB */}
        {activeTab === 'clothing' && (
          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-white/10 text-purple-300 border border-white/20">
                  <Shirt className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-bold uppercase tracking-widest">Outfit Recommendation</div>
                  <div className="text-lg font-light text-white mt-0.5">
                    {clothing.summary}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {clothing.items.map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/90 font-light flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-300/20 text-xs text-amber-200 flex items-start gap-2.5">
              <Sun className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">UV Protection (Max Index {uvGuide.index}):</span>{' '}
                <span className="font-light">{uvGuide.advice}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
