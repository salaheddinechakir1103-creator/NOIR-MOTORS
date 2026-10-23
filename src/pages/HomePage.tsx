import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CinematicHeroVideo } from '../components/video/CinematicHeroVideo';
import { StoryboardModal } from '../components/video/StoryboardModal';
import { CarCanvas, CameraPreset } from '../components/3d/CarCanvas';
import { CarControlsDock } from '../components/3d/CarControlsDock';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle, MoroccanCity } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  MapPin, 
  Key, 
  Award, 
  Zap, 
  ChevronRight,
  MessageSquare,
  Film,
  Box
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenBooking: (vehicle: Vehicle) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const { vehicles } = useApp();

  // Mode: 'video' (Cinematic 3D Animated Film) or 'studio3d' (Interactive Three.js Model)
  const [heroMode, setHeroMode] = useState<'video' | 'studio3d'>('video');
  const [storyboardOpen, setStoryboardOpen] = useState(false);

  // 3D Supercar Studio States (for studio3d mode)
  const [carColor, setCarColor] = useState('#0a0a0c'); // Noir Onyx by default
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('front-3-4');
  const [isRotating, setIsRotating] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Quick Filter Bar
  const [quickCity, setQuickCity] = useState<MoroccanCity>('Casablanca');
  const [quickCategory, setQuickCategory] = useState('Tous');

  // Featured vehicles (4 handpicked icons)
  const featuredVehicles = vehicles.slice(0, 4);

  const hotspotDetails: Record<number, { title: string; subtitle: string; spec: string }> = {
    1: { title: 'Groupe Motopropulseur V8 Bi-Turbo', subtitle: 'Architecture à carter sec montée en position centrale arrière', spec: '720 ch · 770 Nm · 8 000 tr/min' },
    2: { title: 'Aérodynamique Active en Carbone', subtitle: 'Splitter avant à canal S-Duct générant un appui plaqué au sol', spec: '385 kg d\'appui à 250 km/h' },
    3: { title: 'Freinage Carbone-Céramique', subtitle: 'Disques ventilés perforés avec étriers monoblocs 6 pistons', spec: '100 à 0 km/h en 29,5 mètres' },
    4: { title: 'Habitacle Couture & Fibre de Carbone', subtitle: 'Sellerie Alcantara avec surpiqûres orange Sahara et volant F1', spec: 'Finition artisanale sur mesure' },
  };

  return (
    <div className="w-full">
      {/* ========================================================
          HERO SECTION: CINEMATIC 3D VIDEO COMMERCIAL OR STUDIO 3D
          ======================================================== */}
      {heroMode === 'video' ? (
        /* MODE 1: FULL-SCREEN CINEMATIC 3D ANIMATION VIDEO */
        <CinematicHeroVideo
          onSwitchTo3D={() => setHeroMode('studio3d')}
          onExploreFleet={() => onNavigate('fleet')}
          onBookNow={() => onNavigate('reservation')}
          onOpenStoryboard={() => setStoryboardOpen(true)}
        />
      ) : (
        /* MODE 2: INTERACTIVE THREE.JS 3D CANVAS & CONTROLS */
        <section className="relative w-full h-[88vh] min-h-[640px] max-h-[920px] bg-[#070709] overflow-hidden">
          <div className="absolute inset-0 subtle-grid opacity-30 pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-600/10 blur-[130px] rounded-full pointer-events-none" />

          {/* 3D Viewport */}
          <div className="absolute inset-0 z-0">
            <CarCanvas
              color={carColor}
              headlightsOn={headlightsOn}
              cameraPreset={cameraPreset}
              isRotating={isRotating}
              activeHotspot={activeHotspot}
              onSelectHotspot={setActiveHotspot}
            />
          </div>

          {/* Top Brand Overlay & Mode Switcher */}
          <div className="absolute top-8 left-0 right-0 z-10 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-between gap-4">
              <div className="pointer-events-auto">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold mb-2">
                  <span>Studio 3D Temps Réel</span>
                  <span aria-hidden="true">·</span>
                  <span>Inspection Libre 360°</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-[0.95]">
                  PERSONNALISATION<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500">
                    SUR-MESURE.
                  </span>
                </h1>
              </div>

              {/* Toggle back to Video */}
              <div className="pointer-events-auto flex items-center gap-2">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 flex items-center gap-1 shadow-2xl">
                  <button
                    onClick={() => setHeroMode('video')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5 text-orange-400" />
                    <span>Film 3D</span>
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-orange-500 text-black shadow-sm"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Studio 3D</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hotspot details card */}
          {activeHotspot && hotspotDetails[activeHotspot] && (
            <div className="absolute top-28 right-6 z-20 w-80 bg-zinc-950/90 border border-orange-500/50 rounded-xl p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-right-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-semibold">
                  Spécification Aérodynamique
                </span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-zinc-400 hover:text-white text-xs p-0.5"
                >
                  ✕
                </button>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                {hotspotDetails[activeHotspot].title}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                {hotspotDetails[activeHotspot].subtitle}
              </p>
              <div className="text-xs font-mono font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-2">
                {hotspotDetails[activeHotspot].spec}
              </div>
            </div>
          )}

          {/* 3D Bottom Dock */}
          <CarControlsDock
            currentColor={carColor}
            onColorChange={setCarColor}
            headlightsOn={headlightsOn}
            onToggleHeadlights={() => setHeadlightsOn(!headlightsOn)}
            cameraPreset={cameraPreset}
            onCameraChange={setCameraPreset}
            isRotating={isRotating}
            onToggleRotate={() => setIsRotating(!isRotating)}
          />
        </section>
      )}

      {/* Storyboard Modal */}
      {storyboardOpen && (
        <StoryboardModal onClose={() => setStoryboardOpen(false)} />
      )}

      {/* ========================================================
          FAST RESERVATION SEARCH & CITY STRIP
          ======================================================== */}
      <section className="relative z-20 -mt-6 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0e0f14] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Field 1: City */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Ville de Départ</span>
              </label>
              <select
                value={quickCity}
                onChange={(e) => setQuickCity(e.target.value as MoroccanCity)}
                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl py-2 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="Casablanca">Casablanca (Anfa / Aéro)</option>
                <option value="Marrakech">Marrakech (Hivernage / Menara)</option>
                <option value="Rabat">Rabat (Souissi / Agdal)</option>
                <option value="Tanger">Tanger (Marina Bay)</option>
                <option value="Agadir">Agadir (Baie / Marina)</option>
              </select>
            </div>

            {/* Field 2: Category */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-orange-500" />
                <span>Catégorie de Véhicule</span>
              </label>
              <select
                value={quickCategory}
                onChange={(e) => setQuickCategory(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl py-2 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="Tous">Toutes les Catégories</option>
                <option value="Supercar">Supercar (V8 / V10)</option>
                <option value="Grand Tourer">Grand Tourer Prestige</option>
                <option value="SUV Prestige">SUV Prestige & Luxe</option>
                <option value="Cabriolet">Cabriolet & Spyder</option>
                <option value="Berline Élite">Berline Élite V12</option>
              </select>
            </div>

            {/* Field 3: Service Protocol */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                <span>Type de Mise à Disposition</span>
              </label>
              <div className="bg-zinc-900 border border-zinc-700/80 rounded-xl py-2 px-3 text-xs text-zinc-300">
                Conduite Libre ou Chauffeur VIP
              </div>
            </div>

            {/* Action Button */}
            <div>
              <label className="block text-[11px] font-medium text-transparent mb-1.5">Action</label>
              <button
                onClick={() => onNavigate('fleet')}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 hover:bg-orange-400 rounded-xl shadow-[0_2px_15px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Voir les 16 Modèles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED COLLECTION: "LA SÉLECTION MAÎTRESSE"
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-2">
              Flotte d'Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              La Sélection Maîtresse
            </h2>
          </div>
          <button
            onClick={() => onNavigate('fleet')}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-orange-400 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <span>Explorer la flotte intégrale (16 véhicules)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={(v) => onNavigate('detail', { vehicleId: v.id })}
              onBook={(v) => onOpenBooking(v)}
            />
          ))}
        </div>
      </section>

      {/* ========================================================
          L'ART DE VIVRE NOIR MOTORS: EDITORIAL STORY
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-3">
              L'Expérience Marocaine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight">
              L'ÉLÉGANCE INTEMPORELLE DES ROUTES DU ROYAUME.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mt-4">
              Noir Motors transforme chaque déplacement au Maroc en une symphonie de puissance et de distinction. Que vous rejoigniez un palace à Marrakech, un sommet d'affaires à Casablanca Anfa ou les virages panoramiques du Haut Atlas, notre conciergerie assure un service sans la moindre concession.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">Remise des Clés Sur-Mesure</h4>
                  <p className="text-xs text-zinc-400">
                    Dépose immédiate au pied de votre jet privé à l'aéroport Mohammed V ou Menara, ou directement à votre résidence privée.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">Chauffeurs Protocolaires Dédiés</h4>
                  <p className="text-xs text-zinc-400">
                    Chauffeurs de sécurité formés aux standards internationaux de protection rapprochée et de discrétion absolue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">Roadtrips & Escapades Atlas</h4>
                  <p className="text-xs text-zinc-400">
                    Itinéraires personnalisés préparés par nos soins : cols de l'Atlas, désert d'Agafay, corniches atlantiques d'Essaouira et Tanger.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors cursor-pointer"
              >
                Découvrir Nos Services VIP
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-700 rounded-lg transition-colors cursor-pointer"
              >
                Contacter un Concierge
              </button>
            </div>
          </div>

          {/* High-res Moroccan imagery showcasing the Rolls-Royce chauffeur service */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
            <img
              src="/src/assets/images/service_vip_chauffeur_1792768236202.jpg"
              alt="Service Chauffeur VIP Casablanca"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400">
                  Service Palace & Chauffeur
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Protocole VIP & Accueil Aéroports Royaux
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PRESTIGE LIFESTYLE SHOWCASE (VILLA MARRAKECH & SALON VIP)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-2">
            Salons & Destinées
          </div>
          <h2 className="text-3xl font-bold font-display text-white tracking-tight">
            Au Cœur des Plus Beaux Lieux du Maroc
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tile 1: Villa Palmeraie Marrakech */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] group">
            <img
              src="/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg"
              alt="Villa Marrakech Palmeraie Supercar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-mono uppercase text-orange-400">Marrakech Palmeraie</span>
              <h3 className="text-xl font-bold text-white mt-1">Écrin des Villas et Résidences Privées</h3>
              <p className="text-xs text-zinc-300 mt-2 max-w-md">
                Livraison de votre McLaren 720S ou Lamborghini Urus directement à votre villa avec briefing complet de prise en main.
              </p>
            </div>
          </div>

          {/* Tile 2: VIP Lounge Casablanca */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] group">
            <img
              src="/src/assets/images/showroom_morocco_lounge_1792768237075.jpg"
              alt="Salon VIP Casablanca Anfa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-mono uppercase text-orange-400">Casablanca Anfa</span>
              <h3 className="text-xl font-bold text-white mt-1">Salon Privé & Handover VIP</h3>
              <p className="text-xs text-zinc-300 mt-2 max-w-md">
                Espace feutré dédié aux contrats confidentiels, dégustation de thé à la menthe raffiné et remise de clés exclusive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          WHATSAPP CONCIERGE BANNER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-orange-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assistance Personnalisée Immédiate</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              Une demande particulière ou un itinéraire sur mesure ?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Nos concierges sont disponibles 24/7 sur WhatsApp pour coordonner une livraison en urgence, un cortège officiel ou une configuration exclusive.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://wa.me/212661000000?text=Bonjour%20Conciergerie%20Noir%20Motors%20Maroc"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl flex items-center gap-2 shadow-[0_4px_20px_rgba(52,211,153,0.3)] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Échanger sur WhatsApp VIP</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-all cursor-pointer"
            >
              Formulaire Confidentiel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
