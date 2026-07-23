import React, { useState, useEffect, useRef } from 'react';
import { GeocodingLocation } from '../types/weather';
import { searchCities, POPULAR_CITIES } from '../services/weatherApi';
import { Search, MapPin, X, Loader2, Navigation, Building2 } from 'lucide-react';

interface Props {
  onSelectCity: (city: GeocodingLocation) => void;
  onUseMyLocation: () => void;
  isLocating?: boolean;
}

export const SearchBar: React.FC<Props> = ({
  onSelectCity,
  onUseMyLocation,
  isLocating = false,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      setErrorMsg(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const locations = await searchCities(query);
        setResults(locations);
        if (locations.length === 0) {
          setErrorMsg(`No cities found matching "${query}". Try checking the spelling.`);
        }
      } catch (err) {
        setErrorMsg('Unable to search cities at this moment. Please check network connection.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: GeocodingLocation) => {
    onSelectCity(city);
    setQuery('');
    setIsOpen(false);
    setResults([]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    } else if (query.trim().length >= 2) {
      // Trigger search
      setIsLoading(true);
      searchCities(query).then((locs) => {
        if (locs.length > 0) {
          handleSelect(locs[0]);
        } else {
          setErrorMsg(`City "${query}" not found. Try searching for major cities nearby.`);
        }
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3" ref={dropdownRef}>
      <div className="relative">
        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <div className="absolute left-5 text-white/60 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search intelligence for a city..."
            className="w-full py-3.5 pl-13 pr-32 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 text-sm sm:text-base shadow-2xl transition-all"
          />

          <div className="absolute right-3 flex items-center gap-1.5">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  setErrorMsg(null);
                }}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Use My Location button */}
            <button
              type="button"
              onClick={onUseMyLocation}
              disabled={isLocating}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 border border-white/20 text-xs font-semibold transition-all disabled:opacity-50 shadow"
              title="Use Current GPS Location"
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <Navigation className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">GPS Location</span>
            </button>
          </div>
        </form>

        {/* Dropdown Suggestions */}
        {isOpen && (query.trim().length >= 2 || results.length > 0) && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-3xl bg-slate-900/90 border border-white/20 shadow-2xl backdrop-blur-2xl z-50 overflow-hidden divide-y divide-white/10 max-h-80 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center gap-2 p-4 text-white/70 text-sm">
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                Searching Open-Meteo geocoding database...
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="py-2">
                <div className="px-5 py-1.5 text-[10px] font-bold tracking-widest text-white/50 uppercase">
                  Search Results
                </div>
                {results.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => handleSelect(location)}
                    className="w-full px-5 py-3 text-left hover:bg-white/15 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/10 text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">
                          {location.name}
                        </div>
                        <div className="text-xs text-white/60">
                          {[location.admin1, location.country].filter(Boolean).join(', ')}
                        </div>
                      </div>
                    </div>
                    {location.elevation !== undefined && (
                      <span className="text-[11px] text-white/40 font-mono">
                        {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {!isLoading && errorMsg && (
              <div className="p-4 text-amber-300 text-sm bg-amber-500/20 border-l-4 border-amber-400">
                {errorMsg}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular Quick Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-white/60 font-bold uppercase text-[10px] tracking-widest shrink-0 flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" /> Quick Select:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelectCity(city)}
            className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/15 shrink-0 transition-all text-xs font-light hover:border-white/40 shadow-sm"
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};
