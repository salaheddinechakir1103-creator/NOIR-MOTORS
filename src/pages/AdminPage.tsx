import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle, Booking, VehicleCategory, MoroccanCity } from '../types';
import { 
  BarChart3, 
  Car, 
  CalendarDays, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  RotateCcw, 
  Search, 
  Filter, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    vehicles, 
    bookings, 
    addVehicle, 
    updateVehicle, 
    deleteVehicle, 
    updateBookingStatus, 
    resetToDefaults, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kpi' | 'fleet' | 'bookings'>('kpi');

  // Search & filter for fleet
  const [fleetSearch, setFleetSearch] = useState('');
  // Search & filter for bookings
  const [bookingSearch, setBookingSearch] = useState('');

  // Add vehicle modal state
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    brand: '',
    model: '',
    category: 'Supercar' as VehicleCategory,
    year: 2024,
    pricePerDayMAD: 12000,
    depositMAD: 70000,
    powerHP: 650,
    acceleration0to100: 3.2,
    topSpeedKmH: 330,
    engine: 'V8 4.0L Bi-Turbo',
    transmission: 'Double embrayage 7 rapports',
    seats: 2,
    luggageCount: 2,
    availableCities: ['Casablanca', 'Marrakech'] as MoroccanCity[],
    status: 'Disponible' as 'Disponible' | 'Réservé' | 'En Entretien',
    image: '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg',
    gallery: ['/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg'],
    colorsAvailable: [{ name: 'Noir Onyx', hex: '#0a0a0c' }],
    description: 'Nouveau bolide d\'exception intégré à la collection Noir Motors.',
    highlights: ['Échappement sport', 'Freins carbone céramique'],
  });

  // Calculate KPIs
  const totalRevenueMAD = useMemo(() => {
    return bookings.reduce((sum, b) => (b.status !== 'Annulée' ? sum + b.totalPriceMAD : sum), 0);
  }, [bookings]);

  const activeBookingsCount = useMemo(() => {
    return bookings.filter((b) => b.status === 'Confirmée' || b.status === 'En attente').length;
  }, [bookings]);

  const fleetOccupancyRate = useMemo(() => {
    if (vehicles.length === 0) return 0;
    const reservedCount = vehicles.filter((v) => v.status === 'Réservé').length;
    return Math.round((reservedCount / vehicles.length) * 100);
  }, [vehicles]);

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.name || !newVehicle.brand) {
      alert('Veuillez renseigner au moins le nom et la marque.');
      return;
    }
    addVehicle(newVehicle);
    setIsAddingVehicle(false);
    showToast(`${newVehicle.name} a été ajouté avec succès`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner with Demo Disclaimer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-orange-400 font-semibold mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Tableau de Bord de Gestion Flotte</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight uppercase">
            Administration NOIR MOTORS
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gestion en direct de la flotte, approbation des réservations et suivi commercial.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700/80 rounded-xl transition-colors cursor-pointer"
            title="Réinitialiser les véhicules et réservations d'origine"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
            <span>Réinitialiser Données Démo</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab('kpi')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
            activeTab === 'kpi'
              ? 'bg-orange-500 text-black shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Vue d'Ensemble & KPIs</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
            activeTab === 'fleet'
              ? 'bg-orange-500 text-black shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Flotte ({vehicles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-orange-500 text-black shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Réservations ({bookings.length})</span>
        </button>
      </div>

      {/* TAB 1: KPI CARDS & ANALYTICS */}
      {activeTab === 'kpi' && (
        <div className="space-y-8 animate-in fade-in">
          {/* 4 Primary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* KPI 1 */}
            <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="uppercase font-medium text-[10px]">Chiffre d'Affaires Enregistré</span>
                <DollarSign className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-black font-mono text-white tabular-nums">
                {totalRevenueMAD.toLocaleString('fr-FR')} <span className="text-xs text-orange-400">MAD</span>
              </div>
              <div className="text-[11px] text-emerald-400">
                Basé sur {bookings.length} dossiers démo
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="uppercase font-medium text-[10px]">Supercars en Flotte</span>
                <Car className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-black font-mono text-white tabular-nums">
                {vehicles.length} Véhicules
              </div>
              <div className="text-[11px] text-zinc-400">
                Ferrari, Rolls, McLaren, Porsche...
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="uppercase font-medium text-[10px]">Réservations Actives</span>
                <CalendarDays className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-black font-mono text-white tabular-nums">
                {activeBookingsCount} Dossiers
              </div>
              <div className="text-[11px] text-orange-400">
                En cours ou en attente de dépose
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="uppercase font-medium text-[10px]">Taux d'Engagement Flotte</span>
                <BarChart3 className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-black font-mono text-white tabular-nums">
                {fleetOccupancyRate}%
              </div>
              <div className="text-[11px] text-zinc-400">
                Disponibilité continue 24/7
              </div>
            </div>
          </div>

          {/* Recent Bookings Quick Table */}
          <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4 font-display">
              Dernières Réservations Enregistrées
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-zinc-500 uppercase border-b border-white/5 font-mono text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Réf</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Supercar</th>
                    <th className="py-3 px-3">Dates</th>
                    <th className="py-3 px-3">Lieu</th>
                    <th className="py-3 px-3 text-right">Montant (MAD)</th>
                    <th className="py-3 px-3 text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300 font-mono">
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id} className="hover:bg-zinc-900/40">
                      <td className="py-3 px-3 font-bold text-white">{b.referenceCode}</td>
                      <td className="py-3 px-3">{b.customerName}</td>
                      <td className="py-3 px-3 text-white">{b.vehicleName}</td>
                      <td className="py-3 px-3 text-zinc-400">{b.startDate} ➔ {b.endDate}</td>
                      <td className="py-3 px-3">{b.city}</td>
                      <td className="py-3 px-3 text-right font-bold text-orange-400">
                        {b.totalPriceMAD.toLocaleString('fr-FR')}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            b.status === 'Confirmée'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : b.status === 'En attente'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FLEET MANAGEMENT */}
      {activeTab === 'fleet' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={fleetSearch}
                onChange={(e) => setFleetSearch(e.target.value)}
                placeholder="Filtrer la flotte..."
                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setIsAddingVehicle(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 hover:bg-orange-400 rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un Véhicule</span>
            </button>
          </div>

          {/* Add Vehicle Modal Form */}
          {isAddingVehicle && (
            <div className="bg-[#0f1016] border border-orange-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white uppercase font-display">
                  Intégrer une Nouvelle Supercar à la Flotte
                </h3>
                <button
                  onClick={() => setIsAddingVehicle(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateVehicle} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Nom Complet</label>
                  <input
                    type="text"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    placeholder="Ex: Ferrari 296 GTB"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Marque</label>
                  <input
                    type="text"
                    value={newVehicle.brand}
                    onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                    placeholder="Ex: Ferrari"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Catégorie</label>
                  <select
                    value={newVehicle.category}
                    onChange={(e) => setNewVehicle({ ...newVehicle, category: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                  >
                    <option value="Supercar">Supercar</option>
                    <option value="Grand Tourer">Grand Tourer</option>
                    <option value="SUV Prestige">SUV Prestige</option>
                    <option value="Cabriolet">Cabriolet</option>
                    <option value="Berline Élite">Berline Élite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Tarif / Jour (MAD)</label>
                  <input
                    type="number"
                    value={newVehicle.pricePerDayMAD}
                    onChange={(e) => setNewVehicle({ ...newVehicle, pricePerDayMAD: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Caution (MAD)</label>
                  <input
                    type="number"
                    value={newVehicle.depositMAD}
                    onChange={(e) => setNewVehicle({ ...newVehicle, depositMAD: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Puissance (ch)</label>
                  <input
                    type="number"
                    value={newVehicle.powerHP}
                    onChange={(e) => setNewVehicle({ ...newVehicle, powerHP: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingVehicle(false)}
                    className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-semibold uppercase tracking-wider"
                  >
                    Ajouter à la Flotte
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Fleet Table */}
          <div className="bg-[#0e0f14] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-zinc-500 uppercase border-b border-white/5 font-mono text-[10px] bg-zinc-950/60">
                  <tr>
                    <th className="py-3 px-4">Véhicule</th>
                    <th className="py-3 px-3">Catégorie</th>
                    <th className="py-3 px-3 font-mono">Puissance</th>
                    <th className="py-3 px-3 font-mono">Tarif / j (MAD)</th>
                    <th className="py-3 px-3 font-mono">Caution (MAD)</th>
                    <th className="py-3 px-3 text-center">Statut</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {vehicles
                    .filter((v) => v.name.toLowerCase().includes(fleetSearch.toLowerCase()))
                    .map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-zinc-900/40">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-8 rounded object-cover"
                          />
                          <div>
                            <div className="font-bold text-white">{vehicle.name}</div>
                            <div className="text-[10px] text-zinc-500 font-mono">{vehicle.brand}</div>
                          </div>
                        </td>
                        <td className="py-3 px-3">{vehicle.category}</td>
                        <td className="py-3 px-3 font-mono text-white">{vehicle.powerHP} ch</td>
                        <td className="py-3 px-3 font-mono font-bold text-orange-400">
                          {vehicle.pricePerDayMAD.toLocaleString('fr-FR')}
                        </td>
                        <td className="py-3 px-3 font-mono text-zinc-400">
                          {vehicle.depositMAD.toLocaleString('fr-FR')}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <select
                            value={vehicle.status}
                            onChange={(e) =>
                              updateVehicle(vehicle.id, {
                                status: e.target.value as 'Disponible' | 'Réservé' | 'En Entretien',
                              })
                            }
                            className="bg-zinc-900 border border-zinc-700/80 rounded px-2 py-1 text-[11px] text-white focus:outline-none"
                          >
                            <option value="Disponible">Disponible</option>
                            <option value="Réservé">Réservé</option>
                            <option value="En Entretien">En Entretien</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteVehicle(vehicle.id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-zinc-800 transition-colors"
                            title="Supprimer ce véhicule"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={bookingSearch}
              onChange={(e) => setBookingSearch(e.target.value)}
              placeholder="Rechercher par référence, client..."
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div className="bg-[#0e0f14] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-zinc-500 uppercase border-b border-white/5 font-mono text-[10px] bg-zinc-950/60">
                  <tr>
                    <th className="py-3 px-4">Référence</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Téléphone</th>
                    <th className="py-3 px-3">Supercar</th>
                    <th className="py-3 px-3">Dates & Durée</th>
                    <th className="py-3 px-3">Ville</th>
                    <th className="py-3 px-3 text-right">Total Net</th>
                    <th className="py-3 px-3 text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300 font-mono">
                  {bookings
                    .filter(
                      (b) =>
                        b.referenceCode.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                        b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                        b.vehicleName.toLowerCase().includes(bookingSearch.toLowerCase())
                    )
                    .map((booking) => (
                      <tr key={booking.id} className="hover:bg-zinc-900/40">
                        <td className="py-3 px-4 font-bold text-white">{booking.referenceCode}</td>
                        <td className="py-3 px-3">{booking.customerName}</td>
                        <td className="py-3 px-3 text-zinc-400">{booking.customerPhone}</td>
                        <td className="py-3 px-3 text-white font-semibold">{booking.vehicleName}</td>
                        <td className="py-3 px-3 text-zinc-400">
                          {booking.startDate} ➔ {booking.endDate} ({booking.totalDays}j)
                        </td>
                        <td className="py-3 px-3">{booking.city}</td>
                        <td className="py-3 px-3 text-right font-bold text-orange-400">
                          {booking.totalPriceMAD.toLocaleString('fr-FR')} MAD
                        </td>
                        <td className="py-3 px-3 text-center">
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              updateBookingStatus(booking.id, e.target.value as Booking['status'])
                            }
                            className={`border rounded px-2 py-1 text-[11px] font-semibold focus:outline-none ${
                              booking.status === 'Confirmée'
                                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                                : booking.status === 'En attente'
                                ? 'bg-amber-950/60 border-amber-500/50 text-amber-400'
                                : booking.status === 'Terminée'
                                ? 'bg-zinc-900 border-zinc-700 text-zinc-400'
                                : 'bg-red-950/60 border-red-500/50 text-red-400'
                            }`}
                          >
                            <option value="En attente">En attente</option>
                            <option value="Confirmée">Confirmée</option>
                            <option value="Terminée">Terminée</option>
                            <option value="Annulée">Annulée</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
