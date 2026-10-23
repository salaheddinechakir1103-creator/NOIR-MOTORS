import React from 'react';
import { Vehicle } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Scale, Gauge, Zap, Users, ArrowUpRight } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  onBook: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect, onBook }) => {
  const { favorites, toggleFavorite, compareList, toggleCompare } = useApp();
  const isFav = favorites.includes(vehicle.id);
  const isCompared = compareList.includes(vehicle.id);

  return (
    <div className="noir-vehicle-card group relative bg-[#0d0e12] border border-white/[0.08] hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between">
      {/* Top Media Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            // High-res fallback container if necessary
            (e.target as HTMLImageElement).src = vehicle.image;
          }}
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Utility Controls (Favorite & Compare) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(vehicle.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isCompared
                ? 'bg-orange-500 text-black font-semibold'
                : 'bg-black/50 text-white hover:bg-black/80 border border-white/10'
            }`}
            title={isCompared ? 'Retirer du comparateur' : 'Ajouter au comparateur'}
            aria-label="Comparer ce véhicule"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(vehicle.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isFav
                ? 'bg-red-500 text-white'
                : 'bg-black/50 text-white hover:bg-black/80 border border-white/10'
            }`}
            title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-label="Ajouter aux favoris"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Unboxed editorial badge if present */}
        {vehicle.badge && (
          <div className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-orange-400 font-mono bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-orange-500/20">
            {vehicle.badge}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category and Year (Clean unboxed with dot separator) */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5">
            <span>{vehicle.category}</span>
            <span aria-hidden="true">·</span>
            <span>Année {vehicle.year}</span>
            <span aria-hidden="true">·</span>
            <span>{vehicle.availableCities[0]}</span>
          </div>

          {/* Vehicle Name */}
          <h3
            onClick={() => onSelect(vehicle)}
            className="text-lg font-bold text-white hover:text-orange-400 transition-colors cursor-pointer tracking-tight"
          >
            {vehicle.name}
          </h3>

          {/* Key Specs Strip */}
          <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-white/[0.06] text-xs">
            <div>
              <div className="text-zinc-500 text-[11px]">Puissance</div>
              <div className="font-mono font-semibold text-zinc-200 tabular-nums">
                {vehicle.powerHP} ch
              </div>
            </div>
            <div>
              <div className="text-zinc-500 text-[11px]">0-100 km/h</div>
              <div className="font-mono font-semibold text-zinc-200 tabular-nums">
                {vehicle.acceleration0to100}s
              </div>
            </div>
            <div>
              <div className="text-zinc-500 text-[11px]">V-Max</div>
              <div className="font-mono font-semibold text-zinc-200 tabular-nums">
                {vehicle.topSpeedKmH} km/h
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Call to Actions */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">À partir de</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                {vehicle.pricePerDayMAD.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs text-orange-400 font-semibold font-mono">MAD / j</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(vehicle)}
              className="p-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title="Consulter la fiche technique complète"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onBook(vehicle)}
              className="px-3.5 py-2 text-xs font-semibold text-black bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors cursor-pointer"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
