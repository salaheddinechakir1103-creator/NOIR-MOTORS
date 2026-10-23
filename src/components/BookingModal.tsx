import React, { useState, useMemo } from 'react';
import { Vehicle, MoroccanCity } from '../types';
import { BOOKING_EXTRAS } from '../data/vehicles';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { X, Calendar, MapPin, Shield, CheckCircle2, MessageSquare, Printer, Check } from 'lucide-react';

interface BookingModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSuccess: (bookingRef: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ vehicle, onClose, onSuccess }) => {
  const { createBooking } = useApp();

  // Booking form states
  const [startDate, setStartDate] = useState('2026-10-26');
  const [endDate, setEndDate] = useState('2026-10-29');
  const [city, setCity] = useState<MoroccanCity>('Casablanca');
  const [pickupLocation, setPickupLocation] = useState('Aéroport Mohammed V (Terminal VIP)');
  const [dropoffLocation, setDropoffLocation] = useState('Aéroport Mohammed V (Terminal VIP)');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+212 6');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['assurance-zero-franchise']);

  // Success state
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Calculate rental days
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
    // Duration discount
    let discountRate = 0;
    if (totalDays >= 7) discountRate = 0.20;
    else if (totalDays >= 3) discountRate = 0.10;
    const disc = base * discountRate;

    // Extras cost
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

  if (!vehicle) return null;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = (e: React.FormEvent) => {
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

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ffedd5', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    setConfirmedBooking(booking);
    onSuccess(booking.referenceCode);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Bonjour Conciergerie NOIR MOTORS, je souhaite réserver le véhicule suivant :\n\n` +
      `🚗 Véhicule : ${vehicle.name} (${vehicle.powerHP} ch)\n` +
      `📅 Dates : Du ${startDate} au ${endDate} (${totalDays} jour(s))\n` +
      `📍 Ville : ${city} (${pickupLocation})\n` +
      `💰 Montant estimé : ${totalPrice.toLocaleString('fr-FR')} MAD\n` +
      `👤 Client : ${customerName || 'Client Privé'}\n` +
      `📞 Tél : ${customerPhone}\n\n` +
      `Merci de me confirmer la disponibilité prioritaire.`
    );
    window.open(`https://wa.me/212661000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f1015] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Confirmation Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/40 flex items-center justify-center text-orange-500 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
                Réservation Confirmée
              </span>
              <h2 className="text-2xl font-bold font-display mt-1">Votre Expérience est Réservée</h2>
              <p className="text-sm text-zinc-400 mt-2">
                Code de référence : <span className="font-mono text-white font-bold">{confirmedBooking.referenceCode}</span>
              </p>
            </div>

            {/* Voucher Summary Card */}
            <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-5 text-left text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-zinc-400">Supercar :</span>
                <span className="text-white font-semibold">{vehicle.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-zinc-400">Période :</span>
                <span className="text-white">{startDate} ➔ {endDate} ({totalDays} jours)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-zinc-400">Lieu de dépose :</span>
                <span className="text-white">{city} ({pickupLocation})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-zinc-400">Total TTC :</span>
                <span className="text-orange-400 font-bold text-sm">{totalPrice.toLocaleString('fr-FR')} MAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Caution de garantie :</span>
                <span className="text-zinc-300">{vehicle.depositMAD.toLocaleString('fr-FR')} MAD (empreinte CB)</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
              Un concierge Noir Motors va vous contacter dans les 15 minutes au <strong className="text-white">{customerPhone}</strong> pour valider l'heure de livraison de la clé.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-xs font-medium flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer le Voucher</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-black text-xs font-semibold uppercase tracking-wider"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            {/* Header info */}
            <div className="flex items-center gap-4 pb-5 border-b border-white/10">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                referrerPolicy="no-referrer"
                className="w-20 h-14 rounded-lg object-cover border border-white/10"
              />
              <div>
                <span className="text-xs uppercase tracking-wider text-orange-400 font-medium">
                  {vehicle.category} · {vehicle.powerHP} ch
                </span>
                <h3 className="text-lg font-bold font-display text-white">{vehicle.name}</h3>
                <div className="text-xs text-zinc-400">
                  <span className="font-mono text-white font-bold">{vehicle.pricePerDayMAD.toLocaleString('fr-FR')} MAD</span> / jour
                </div>
              </div>
            </div>

            <form onSubmit={handleConfirm} className="space-y-6 pt-5">
              {/* Step 1: Dates & City */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  <span>1. Période & Emplacement au Maroc</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Date de début</label>
                    <input
                      type="date"
                      value={startDate}
                      min="2026-10-23"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Date de restitution</label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Ville</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value as MoroccanCity)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                    >
                      <option value="Casablanca">Casablanca</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Agadir">Agadir</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Lieu de prise en charge</label>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Ex: Aéroport Menara, Hôtel La Mamounia, Villa..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Extras */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-orange-500" />
                  <span>2. Services & Options VIP</span>
                </h4>
                <div className="space-y-2">
                  {BOOKING_EXTRAS.slice(0, 3).map((extra) => {
                    const isSelected = selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-orange-500/10 border-orange-500/50 text-white'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isSelected ? 'bg-orange-500 border-orange-500 text-black' : 'border-zinc-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="font-medium text-white">{extra.name}</div>
                            <div className="text-[11px] text-zinc-400">{extra.description}</div>
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

              {/* Step 3: Customer Details */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
                  3. Vos Coordonnées
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Yassine Berrada"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Téléphone (WhatsApp) *</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+212 6..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Summary Strip */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Location ({totalDays} jour{totalDays > 1 ? 's' : ''}) :</span>
                  <span>{basePrice.toLocaleString('fr-FR')} MAD</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Remise durée ({totalDays >= 7 ? '-20%' : '-10%'}) :</span>
                    <span>-{discount.toLocaleString('fr-FR')} MAD</span>
                  </div>
                )}
                {extrasPrice > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Options VIP :</span>
                    <span>+{extrasPrice.toLocaleString('fr-FR')} MAD</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10 text-white">
                  <span>Total à régler :</span>
                  <span className="text-orange-400">{totalPrice.toLocaleString('fr-FR')} MAD</span>
                </div>
                <div className="text-[10px] text-zinc-500 pt-1">
                  Caution requise à la livraison : {vehicle.depositMAD.toLocaleString('fr-FR')} MAD (empreinte bancaire sécurisée).
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl transition-all shadow-[0_4px_20px_rgba(249,115,22,0.35)] cursor-pointer"
                >
                  Confirmer la Réservation Immédiate
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Demande via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
