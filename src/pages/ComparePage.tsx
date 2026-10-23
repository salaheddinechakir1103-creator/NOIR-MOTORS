import React from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle } from '../types';
import { ArrowLeft, Plus, X, Zap, Gauge, Scale, Trophy } from 'lucide-react';

interface ComparePageProps {
  onBack: () => void;
  onNavigate: (page: string, params?: any) => void;
  onOpenBooking: (vehicle: Vehicle) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onBack, onNavigate, onOpenBooking }) => {
  const { vehicles, compareList, removeFromCompare, toggleCompare } = useApp();

  // If user has no vehicles in comparison, show the top 2 by default
  const selectedVehicles = compareList.length > 0
    ? vehicles.filter((v) => compareList.includes(v.id))
    : vehicles.slice(0, 2);

  // Compute best values for highlights
  const highestPower = Math.max(...selectedVehicles.map((v) => v.powerHP));
  const fastest0100 = Math.min(...selectedVehicles.map((v) => v.acceleration0to100));
  const highestVmax = Math.max(...selectedVehicles.map((v) => v.topSpeedKmH));
  const lowestPrice = Math.min(...selectedVehicles.map((v) => v.pricePerDayMAD));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight uppercase">
            Comparateur de Supercars
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Comparez jusqu'à 3 modèles côte à côte pour choisir la monture idéale de votre séjour.
          </p>
        </div>

        <button
          onClick={() => onNavigate('fleet')}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors cursor-pointer"
        >
          Ajouter un Véhicule
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto pb-6">
        <div className="min-w-[700px] grid grid-cols-4 gap-4">
          {/* Column 0: Row Labels */}
          <div className="space-y-4 pt-48 font-mono text-xs">
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Catégorie & Année
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Tarif Journalier
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Puissance Moteur
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Accélération 0-100 km/h
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Vitesse Maximale
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Motorisation
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Transmission
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Places & Bagages
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 font-semibold text-zinc-400">
              Caution Requise
            </div>
          </div>

          {/* Columns 1-3: Compared Vehicles */}
          {selectedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-[#0e0f14] border border-white/10 rounded-2xl p-4 flex flex-col justify-between"
            >
              {/* Vehicle Top Preview */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black mb-3">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromCompare(vehicle.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-400 hover:text-white"
                  title="Retirer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mb-4 text-center">
                <h3 className="text-base font-bold text-white tracking-tight">{vehicle.name}</h3>
                <div className="text-xs text-orange-400 font-mono mt-0.5">{vehicle.brand}</div>
              </div>

              {/* Data Rows */}
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 bg-zinc-900/40 rounded-xl text-center text-zinc-200">
                  {vehicle.category} ({vehicle.year})
                </div>

                {/* Price */}
                <div
                  className={`p-3 rounded-xl text-center font-bold ${
                    vehicle.pricePerDayMAD === lowestPrice
                      ? 'bg-orange-500/10 border border-orange-500/40 text-orange-400'
                      : 'bg-zinc-900/40 text-white'
                  }`}
                >
                  {vehicle.pricePerDayMAD.toLocaleString('fr-FR')} MAD / j
                  {vehicle.pricePerDayMAD === lowestPrice && (
                    <span className="block text-[10px] text-orange-400">Tarif le plus doux</span>
                  )}
                </div>

                {/* Power */}
                <div
                  className={`p-3 rounded-xl text-center font-bold ${
                    vehicle.powerHP === highestPower
                      ? 'bg-orange-500/10 border border-orange-500/40 text-orange-400'
                      : 'bg-zinc-900/40 text-white'
                  }`}
                >
                  {vehicle.powerHP} ch
                  {vehicle.powerHP === highestPower && (
                    <span className="block text-[10px] text-orange-400">Plus puissant</span>
                  )}
                </div>

                {/* 0-100 */}
                <div
                  className={`p-3 rounded-xl text-center font-bold ${
                    vehicle.acceleration0to100 === fastest0100
                      ? 'bg-orange-500/10 border border-orange-500/40 text-orange-400'
                      : 'bg-zinc-900/40 text-white'
                  }`}
                >
                  {vehicle.acceleration0to100} s
                  {vehicle.acceleration0to100 === fastest0100 && (
                    <span className="block text-[10px] text-orange-400">Le plus vif</span>
                  )}
                </div>

                {/* Top Speed */}
                <div
                  className={`p-3 rounded-xl text-center font-bold ${
                    vehicle.topSpeedKmH === highestVmax
                      ? 'bg-orange-500/10 border border-orange-500/40 text-orange-400'
                      : 'bg-zinc-900/40 text-white'
                  }`}
                >
                  {vehicle.topSpeedKmH} km/h
                  {vehicle.topSpeedKmH === highestVmax && (
                    <span className="block text-[10px] text-orange-400">Vitesse de pointe</span>
                  )}
                </div>

                {/* Engine */}
                <div className="p-3 bg-zinc-900/40 rounded-xl text-center text-zinc-300 truncate">
                  {vehicle.engine}
                </div>

                {/* Transmission */}
                <div className="p-3 bg-zinc-900/40 rounded-xl text-center text-zinc-300 truncate">
                  {vehicle.transmission}
                </div>

                {/* Capacity */}
                <div className="p-3 bg-zinc-900/40 rounded-xl text-center text-zinc-300">
                  {vehicle.seats} places · {vehicle.luggageCount} bagages
                </div>

                {/* Deposit */}
                <div className="p-3 bg-zinc-900/40 rounded-xl text-center text-zinc-400">
                  {vehicle.depositMAD.toLocaleString('fr-FR')} MAD
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-4 border-t border-white/5 space-y-2">
                <button
                  onClick={() => onOpenBooking(vehicle)}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors cursor-pointer"
                >
                  Réserver ce Modèle
                </button>
                <button
                  onClick={() => onNavigate('detail', { vehicleId: vehicle.id })}
                  className="w-full py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                >
                  Fiche Complète
                </button>
              </div>
            </div>
          ))}

          {/* Add more slot if < 3 */}
          {selectedVehicles.length < 3 && (
            <div
              onClick={() => onNavigate('fleet')}
              className="border-2 border-dashed border-white/10 hover:border-orange-500/40 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-orange-400 group-hover:border-orange-500/40 transition-colors mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Ajouter un Véhicule</h4>
              <p className="text-xs text-zinc-500 mt-1">
                Choisissez un autre bolide dans la flotte
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
