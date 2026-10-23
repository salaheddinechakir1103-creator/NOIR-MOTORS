import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle, MoroccanCity, Booking } from '../types';
import { BOOKING_EXTRAS } from '../data/vehicles';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  MessageSquare, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ReservationPageProps {
  initialVehicleId?: string;
  onNavigate: (page: string, params?: any) => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({ initialVehicleId, onNavigate }) => {
  const { vehicles, createBooking } = useApp();

  // Selected vehicle
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    initialVehicleId || vehicles[0]?.id || ''
  );

  const vehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // Dates and places
  const [startDate, setStartDate] = useState('2026-10-26');
  const [endDate, setEndDate] = useState('2026-10-29');
  const [city, setCity] = useState<MoroccanCity>('Casablanca');
  const [pickupLocation, setPickupLocation] = useState('Aéroport Mohammed V (Terminal VIP)');
  const [dropoffLocation, setDropoffLocation] = useState('Aéroport Mohammed V (Terminal VIP)');

  // Extras
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['assurance-zero-franchise']);

  // Customer
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+212 6');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Rental days
  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  // Pricing math
  const { basePrice, discount, extrasPrice, totalPrice } = useMemo(() => {
    if (!vehicle) return { basePrice: 0, discount: 0, extrasPrice: 0, totalPrice: 0 };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    const booking = createBooking({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      vehicleImage: vehicle.image,
      customerName,
      customerEmail: customerEmail || 'client@noirmotors.ma',
      customerPhone,
      city,
      pickupLocation,
      dropoffLocation,
      startDate,
      endDate,
      totalDays,
      basePriceMAD: basePrice,
      discountMAD: discount,
      extrasMAD: extrasPrice,
      totalPriceMAD: totalPrice,
      depositMAD: vehicle.depositMAD,
      selectedExtras,
      status: 'Confirmée',
      specialRequests,
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ffedd5', '#ffffff'],
      });
    } catch {}

    setConfirmedBooking(booking);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Bonjour Conciergerie NOIR MOTORS,\n\nJe souhaite réserver le véhicule : ${vehicle.name}\n` +
      `Dates : Du ${startDate} au ${endDate} (${totalDays} jours)\n` +
      `Ville : ${city} (${pickupLocation})\n` +
      `Tarif calculé : ${totalPrice.toLocaleString('fr-FR')} MAD\n` +
      `Client : ${customerName || 'Client Privé'} (${customerPhone})\n\n` +
      `Merci de confirmer la disponibilité.`
    );
    window.open(`https://wa.me/212661000000?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 mb-10">
        <div className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-2">
          Réservation Directe & Sécurisée
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
          Réservez Votre Véhicule
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-xl">
          Sélectionnez votre bolide, ajustez votre itinéraire au Maroc et profitez d'une prise en charge sans délai.
        </p>
      </div>

      {confirmedBooking ? (
        /* Booking Confirmation Screen */
        <div className="max-w-2xl mx-auto bg-[#0f1016] border border-orange-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6">
          <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/40 flex items-center justify-center text-orange-500 mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
              Réservation Démo Validée
            </span>
            <h2 className="text-3xl font-black font-display text-white mt-1">
              Félicitations, Votre Commande est Prête
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Numéro de Dossier Officiel :{' '}
              <span className="font-mono text-white font-bold">{confirmedBooking.referenceCode}</span>
            </p>
          </div>

          {/* Printable Voucher */}
          <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-6 text-left text-xs font-mono space-y-3">
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-zinc-500">Véhicule :</span>
              <span className="text-white font-semibold">{vehicle.name}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-zinc-500">Dates :</span>
              <span className="text-white">{startDate} ➔ {endDate} ({totalDays} jour{totalDays > 1 ? 's' : ''})</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-zinc-500">Lieu de prise en charge :</span>
              <span className="text-white">{city} · {pickupLocation}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-zinc-500">Client :</span>
              <span className="text-white">{customerName} ({customerPhone})</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-zinc-500">Montant Total TTC :</span>
              <span className="text-orange-400 font-bold text-sm">{totalPrice.toLocaleString('fr-FR')} MAD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Caution de garantie :</span>
              <span className="text-zinc-300">{vehicle.depositMAD.toLocaleString('fr-FR')} MAD (empreinte CB)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-xs font-medium flex items-center justify-center gap-2 text-zinc-300 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer le Bon de Prise en Charge</span>
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Voir dans le Dashboard Admin
            </button>
          </div>
        </div>
      ) : (
        /* Two-Column Booking Interface */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Select Supercar */}
            <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                <span>1. Choix du Bolide</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 text-xs mb-1.5">Véhicule de la flotte</label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.category} · {v.powerHP} ch) — {v.pricePerDayMAD.toLocaleString('fr-FR')} MAD/j
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selected vehicle preview preview card */}
              <div className="mt-4 flex items-center gap-4 p-3 bg-zinc-950/60 rounded-xl border border-white/5">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-16 rounded-lg object-cover"
                />
                <div className="text-xs">
                  <h4 className="font-bold text-white text-sm">{vehicle.name}</h4>
                  <div className="text-zinc-400 text-[11px] mt-0.5">
                    {vehicle.engine} · {vehicle.powerHP} ch · 0-100 en {vehicle.acceleration0to100}s
                  </div>
                  <div className="font-mono text-orange-400 font-semibold mt-1">
                    {vehicle.pricePerDayMAD.toLocaleString('fr-FR')} MAD / jour
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Date & Locations */}
            <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>2. Dates & Villes de Prise en Charge</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Date et heure de début</label>
                  <input
                    type="date"
                    value={startDate}
                    min="2026-10-23"
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Date et heure de restitution</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Ville Maroc</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as MoroccanCity)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Agadir">Agadir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Point exact de livraison</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Aéroport, Palace ou Villa"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 3: VIP Extras */}
            <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>3. Prestations Complémentaires</span>
              </h3>
              <div className="space-y-3">
                {BOOKING_EXTRAS.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-orange-500/10 border-orange-500/50 text-white'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-orange-500 border-orange-500 text-black' : 'border-zinc-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{extra.name}</div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">{extra.description}</div>
                        </div>
                      </div>
                      <div className="font-mono text-orange-400 whitespace-nowrap pl-2">
                        +{extra.pricePerDayMAD * totalDays} MAD
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Customer Details */}
            <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-4">
                4. Identité du Titulaire
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Nom et Prénom *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="M. ou Mme Nom"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Numéro Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 mb-1">Email pour confirmation</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="email@domaine.com"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 mb-1">Consignes spécifiques (vol, hôtel, champagne...)</label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={2}
                    placeholder="Informations supplémentaires pour le concierge..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Summary & Confirm Sticky Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#0f1016] border border-orange-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 font-display">
                Récapitulatif de la Réservation
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-zinc-300">
                  <span>Modèle sélectionné :</span>
                  <span className="text-white font-bold">{vehicle.name}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Durée :</span>
                  <span>{totalDays} jour{totalDays > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Tarif de base :</span>
                  <span>{basePrice.toLocaleString('fr-FR')} MAD</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Remise durée ({totalDays >= 7 ? '-20%' : '-10%'}) :</span>
                    <span>-{discount.toLocaleString('fr-FR')} MAD</span>
                  </div>
                )}
                {extrasPrice > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Services VIP :</span>
                    <span>+{extrasPrice.toLocaleString('fr-FR')} MAD</span>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex justify-between items-baseline text-base font-bold text-white">
                  <span>Total Net :</span>
                  <span className="text-2xl font-mono text-orange-400">
                    {totalPrice.toLocaleString('fr-FR')} <span className="text-xs">MAD</span>
                  </span>
                </div>

                <div className="p-3 bg-zinc-950 rounded-xl border border-white/5 text-[11px] text-zinc-400">
                  Caution de garantie : <strong className="text-white">{vehicle.depositMAD.toLocaleString('fr-FR')} MAD</strong> bloquée par empreinte bancaire lors de la remise des clés et débloquée immédiatement à la restitution.
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl shadow-[0_4px_22px_rgba(249,115,22,0.4)] transition-all cursor-pointer"
                >
                  Confirmer la Réservation Immédiate
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-3 text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Finaliser sur WhatsApp VIP</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
