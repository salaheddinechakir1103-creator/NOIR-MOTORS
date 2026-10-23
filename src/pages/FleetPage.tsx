import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle, VehicleCategory, MoroccanCity } from '../types';
import { Search, SlidersHorizontal, Grid, List, RotateCcw, Zap, Sparkles } from 'lucide-react';

interface FleetPageProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenBooking: (vehicle: Vehicle) => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({ onNavigate, onOpenBooking }) => {
  const { vehicles } = useApp();

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedBrand, setSelectedBrand] = useState<string>('Tous');
  const [selectedCity, setSelectedCity] = useState<string>('Toutes');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'power-desc' | 'accel-asc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(vehicles.map((v) => v.brand)));
    return ['Tous', ...list];
  }, [vehicles]);

  const categories: string[] = [
    'Tous',
    'Supercar',
    'Grand Tourer',
    'SUV Prestige',
    'Cabriolet',
    'Berline Élite',
  ];

  const cities: string[] = ['Toutes', 'Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Agadir'];

  // Filter & Sort logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        const matchesSearch =
          v.name.toLowerCase().includes(search.toLowerCase()) ||
          v.brand.toLowerCase().includes(search.toLowerCase()) ||
          v.engine.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          selectedCategory === 'Tous' || v.category === selectedCategory;

        const matchesBrand = selectedBrand === 'Tous' || v.brand === selectedBrand;

        const matchesCity =
          selectedCity === 'Toutes' || v.availableCities.includes(selectedCity as MoroccanCity);

        const matchesPrice = v.pricePerDayMAD <= maxPrice;

        return matchesSearch && matchesCategory && matchesBrand && matchesCity && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerDayMAD - b.pricePerDayMAD;
        if (sortBy === 'price-desc') return b.pricePerDayMAD - a.pricePerDayMAD;
        if (sortBy === 'power-desc') return b.powerHP - a.powerHP;
        if (sortBy === 'accel-asc') return a.acceleration0to100 - b.acceleration0to100;
        return 0; // default order
      });
  }, [vehicles, search, selectedCategory, selectedBrand, selectedCity, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('Tous');
    setSelectedBrand('Tous');
    setSelectedCity('Toutes');
    setMaxPrice(30000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 mb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-2">
          Flotte Complète au Maroc
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
              La Flotte NOIR MOTORS
            </h1>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              16 supercars et berlines de prestige disponibles immédiatement avec chauffeur ou en conduite libre partout au Maroc.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-orange-500 text-black border-orange-500 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
              title="Affichage Grille"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg border transition-colors ${
                viewMode === 'list'
                  ? 'bg-orange-500 text-black border-orange-500 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
              title="Affichage Liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0e0f14] border border-white/[0.08] rounded-2xl p-5 mb-10 space-y-4">
        {/* Top search & quick category selector */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par modèle, marque, V8..."
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* Interactive Category Tabs (Functional buttons with active state) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-black/40 rounded-xl border border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06] text-xs">
          {/* Brand select */}
          <div>
            <label className="block text-zinc-400 text-[11px] font-medium uppercase mb-1">
              Marque
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* City select */}
          <div>
            <label className="block text-zinc-400 text-[11px] font-medium uppercase mb-1">
              Ville Maroc
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Price slider */}
          <div>
            <div className="flex justify-between text-zinc-400 text-[11px] font-medium uppercase mb-1">
              <span>Prix Max / Jour</span>
              <span className="font-mono text-orange-400 font-bold">{maxPrice.toLocaleString('fr-FR')} MAD</span>
            </div>
            <input
              type="range"
              min={8000}
              max={30000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-zinc-400 text-[11px] font-medium uppercase mb-1">
              Trier Par
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="featured">Recommandés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="power-desc">Puissance (ch)</option>
              <option value="accel-asc">Accélération (0-100)</option>
            </select>
          </div>
        </div>

        {/* Active counts and reset button */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
          <div>
            Affichage de <span className="font-mono font-bold text-white">{filteredVehicles.length}</span> sur <span className="font-mono font-bold text-white">{vehicles.length}</span> véhicules disponibles
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-orange-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser les filtres</span>
          </button>
        </div>
      </div>

      {/* Vehicles Grid / List */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-24 bg-zinc-950 border border-white/5 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-3">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Aucun véhicule ne correspond à ces critères</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Ajustez votre budget maximum ou supprimez vos filtres pour découvrir le reste de la flotte.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 rounded-lg hover:bg-orange-400 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={(v) => onNavigate('detail', { vehicleId: v.id })}
              onBook={(v) => onOpenBooking(v)}
            />
          ))}
        </div>
      ) : (
        /* List Mode */
        <div className="space-y-4">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-[#0d0e12] border border-white/[0.08] hover:border-orange-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-20 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="text-xs text-zinc-400 mb-1">
                    <span>{vehicle.category}</span> · <span>{vehicle.year}</span> · <span>{vehicle.availableCities.join(', ')}</span>
                  </div>
                  <h3
                    onClick={() => onNavigate('detail', { vehicleId: vehicle.id })}
                    className="text-lg font-bold text-white hover:text-orange-400 cursor-pointer"
                  >
                    {vehicle.name}
                  </h3>
                  <div className="text-xs text-zinc-500 mt-1">
                    {vehicle.engine} · {vehicle.transmission}
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="hidden lg:flex items-center gap-8 text-xs font-mono">
                <div>
                  <div className="text-zinc-500">Puissance</div>
                  <div className="text-white font-bold">{vehicle.powerHP} ch</div>
                </div>
                <div>
                  <div className="text-zinc-500">0-100</div>
                  <div className="text-white font-bold">{vehicle.acceleration0to100}s</div>
                </div>
                <div>
                  <div className="text-zinc-500">V-Max</div>
                  <div className="text-white font-bold">{vehicle.topSpeedKmH} km/h</div>
                </div>
              </div>

              {/* Price & Book */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="text-right">
                  <div className="text-[10px] text-zinc-500 uppercase">Tarif jour</div>
                  <div className="font-mono font-bold text-lg text-white">
                    {vehicle.pricePerDayMAD.toLocaleString('fr-FR')} <span className="text-xs text-orange-400 font-semibold">MAD</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('detail', { vehicleId: vehicle.id })}
                    className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 rounded-lg"
                  >
                    Fiche
                  </button>
                  <button
                    onClick={() => onOpenBooking(vehicle)}
                    className="px-4 py-2 text-xs font-semibold text-black bg-orange-500 hover:bg-orange-400 rounded-lg"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
