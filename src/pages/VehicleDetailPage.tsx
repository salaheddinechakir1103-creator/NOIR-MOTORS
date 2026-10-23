import React, { useState, useMemo } from 'react';
import { Vehicle } from '../types';
import { useApp } from '../context/AppContext';
import { BOOKING_EXTRAS } from '../data/vehicles';
import { 
  ArrowLeft, 
  Heart, 
  Scale, 
  Zap, 
  Gauge, 
  Fuel, 
  Layers, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Check, 
  Calendar 
} from 'lucide-react';

interface VehicleDetailPageProps {
  vehicleId: string;
  onBack: () => void;
  onOpenBooking: (vehicle: Vehicle) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  vehicleId,
  onBack,
  onOpenBooking,
  onNavigate,
}) => {
  const { vehicles, favorites, toggleFavorite, compareList, toggleCompare } = useApp();

  const vehicle = vehicles.find((v) => v.id === vehicleId) || vehicles[0];

  // Active gallery image
  const [activeImage, setActiveImage] = useState(vehicle.image);

  // Quick reservation simulator inside the detail page
  const [startDate, setStartDate] = useState('2026-10-26');
  const [endDate, setEndDate] = useState('2026-10-29');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['assurance-zero-franchise']);

  const isFav = favorites.includes(vehicle.id);
  const isCompared = compareList.includes(vehicle.id);

  // Rental days calculation
  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  // Pricing math
  const { basePrice, discount, extrasPrice, totalPrice } = useMemo(() => {
    const base = vehicle.pricePerDayMAD * totalDays;
    let discountRate = 0;
    if (totalDays >= 7) discountRate = 0.20;
    else if (totalDays >= 3) discountRate = 0.10;
    const disc = base * discountRate;

    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = BOOKING_EXTRAS.find((e) => e.id === extraId);
      return sum + (extra ? extra.pricePerDayMAD * totalDays : 0);
    }, 0);

    return {
      basePrice: base,
      discount: disc,
      extrasPrice: extrasTotal,
      totalPrice: base - disc + extrasTotal,
    };
  }, [vehicle, totalDays, selectedExtras]);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Bonjour Conciergerie NOIR MOTORS,\n\nJe souhaite réserver votre ${vehicle.name} (${vehicle.powerHP} ch) pour la période du ${startDate} au ${endDate} (${totalDays} jour(s)).\n\nMontant estimé : ${totalPrice.toLocaleString('fr-FR')} MAD.\nMerci de me recontacter pour bloquer la réservation.`
    );
    window.open(`https://wa.me/212661000000?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top back bar and actions */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la Flotte</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleCompare(vehicle.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              isCompared
                ? 'bg-orange-500 text-black border-orange-500 font-semibold'
                : 'bg-zinc-900 border-zinc-700/80 text-zinc-300 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? 'Dans le comparateur' : 'Comparer'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(vehicle.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isFav
                ? 'bg-red-500/20 text-red-400 border-red-500/40'
                : 'bg-zinc-900 border-zinc-700/80 text-zinc-400 hover:text-white'
            }`}
            title="Ajouter aux favoris"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Media & Specs / Right Booking Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (Media & Technical Sheet) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Hero Image */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl">
            <img
              src={activeImage}
              alt={vehicle.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 text-xs font-mono uppercase bg-black/70 backdrop-blur-md px-3 py-1 rounded text-orange-400 border border-orange-500/30">
              {vehicle.category}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {vehicle.gallery.length > 1 && (
            <div className="flex items-center gap-3">
              {vehicle.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-16 rounded-xl overflow-hidden border transition-all ${
                    activeImage === img ? 'border-orange-500 ring-2 ring-orange-500/50' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Aperçu" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Narrative Description */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              {vehicle.name}
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed mt-4">
              {vehicle.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-4">
              Points Forts & Équipements Exclusifs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
              {vehicle.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4">
              Fiche Technique Homologuée
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5">
                <div className="text-zinc-500 text-[10px] uppercase">Puissance</div>
                <div className="text-base font-bold text-white mt-1">{vehicle.powerHP} ch</div>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5">
                <div className="text-zinc-500 text-[10px] uppercase">0-100 km/h</div>
                <div className="text-base font-bold text-white mt-1">{vehicle.acceleration0to100} s</div>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5">
                <div className="text-zinc-500 text-[10px] uppercase">Vitesse Max</div>
                <div className="text-base font-bold text-white mt-1">{vehicle.topSpeedKmH} km/h</div>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5">
                <div className="text-zinc-500 text-[10px] uppercase">Places</div>
                <div className="text-base font-bold text-white mt-1">{vehicle.seats} personnes</div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs border-t border-white/5 pt-4">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-400">Motorisation :</span>
                <span className="text-white font-medium">{vehicle.engine}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-400">Transmission :</span>
                <span className="text-white font-medium">{vehicle.transmission}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-400">Capacité Bagages :</span>
                <span className="text-white font-medium">{vehicle.luggageCount} valises cabine</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Villes de mise à disposition :</span>
                <span className="text-orange-400 font-medium">{vehicle.availableCities.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Booking & Pricing Calculator */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-[#0f1016] border border-orange-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">Tarif par jour</span>
                <div className="text-3xl font-black font-mono text-white mt-0.5">
                  {vehicle.pricePerDayMAD.toLocaleString('fr-FR')} <span className="text-sm font-semibold text-orange-400">MAD</span>
                </div>
              </div>
              <div className="text-right text-xs text-zinc-400 font-mono">
                <div>Caution : {vehicle.depositMAD.toLocaleString('fr-FR')} MAD</div>
                <div className="text-[10px] text-zinc-500">Empreinte CB restituée</div>
              </div>
            </div>

            {/* Date Pickers */}
            <div className="space-y-3 text-xs">
              <h4 className="font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                <span>Simulateur de Dates</span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Prise en charge</label>
                  <input
                    type="date"
                    value={startDate}
                    min="2026-10-23"
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Restitution</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Optional VIP Extras */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Options VIP Incluses
              </h4>
              {BOOKING_EXTRAS.slice(0, 3).map((extra) => {
                const isSelected = selectedExtras.includes(extra.id);
                return (
                  <div
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-orange-500/10 border-orange-500/50 text-white'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-orange-500 border-orange-500 text-black' : 'border-zinc-600'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="font-medium text-white">{extra.name}</span>
                    </div>
                    <span className="font-mono text-orange-400 text-[11px]">
                      +{extra.pricePerDayMAD * totalDays} MAD
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price Breakdown */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Durée de location :</span>
                <span>{totalDays} jour{totalDays > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tarif de base :</span>
                <span>{basePrice.toLocaleString('fr-FR')} MAD</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Remise long séjour :</span>
                  <span>-{discount.toLocaleString('fr-FR')} MAD</span>
                </div>
              )}
              {extrasPrice > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>Suppléments VIP :</span>
                  <span>+{extrasPrice.toLocaleString('fr-FR')} MAD</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10 text-white">
                <span>Total Estimé :</span>
                <span className="text-orange-400">{totalPrice.toLocaleString('fr-FR')} MAD</span>
              </div>
            </div>

            {/* Direct Reservation Actions */}
            <div className="space-y-3">
              <button
                onClick={() => onOpenBooking(vehicle)}
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl shadow-[0_4px_20px_rgba(249,115,22,0.35)] transition-all cursor-pointer"
              >
                Bloquer ce Véhicule Immédiatement
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3 text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Demande Rapide sur WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
