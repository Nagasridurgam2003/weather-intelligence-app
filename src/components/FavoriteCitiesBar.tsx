import React from 'react';
import { GeocodingLocation } from '../types/weather';
import { Heart, Trash2, MapPin } from 'lucide-react';

interface Props {
  favorites: GeocodingLocation[];
  onSelectCity: (city: GeocodingLocation) => void;
  onRemoveFavorite: (id: number) => void;
}

export const FavoriteCitiesBar: React.FC<Props> = ({
  favorites,
  onSelectCity,
  onRemoveFavorite,
}) => {
  if (favorites.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
      <span className="text-white/60 font-bold uppercase tracking-widest text-[10px] shrink-0 flex items-center gap-1">
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" /> Saved Cities:
      </span>
      {favorites.map((city) => (
        <div
          key={city.id}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 shrink-0 transition-all backdrop-blur-md shadow-md"
        >
          <button
            onClick={() => onSelectCity(city)}
            className="flex items-center gap-1.5 hover:text-amber-300 font-light"
          >
            <MapPin className="w-3 h-3 text-amber-300" />
            <span>{city.name}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFavorite(city.id);
            }}
            className="text-white/40 hover:text-rose-300 p-0.5 rounded-full transition-colors opacity-70 group-hover:opacity-100"
            title="Remove favorite"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
