import noirPageImage0 from '../assets/images/service_vip_chauffeur_1792768236202.jpg';
import noirPageImage1 from '../assets/images/hero_marrakech_palmeraie_1792768235408.jpg';
import noirPageImage2 from '../assets/images/experience_atlas_drive_1792768237978.jpg';
import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Plane, 
  Award, 
  Compass, 
  Users, 
  Clock, 
  Key, 
  Sparkles,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-2">
          Conciergerie & Haute Hospitalité
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
          Services Exclusifs au Maroc
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Plus qu'une simple location, Noir Motors orchestre des prestations d'exception pour dignitaires, voyageurs d'affaires et passionnés d'automobile.
        </p>
      </div>

      {/* Service 1: Chauffeur Privé */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Service Protocolaire</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Chauffeurs Privés & Sécurité Rapprochée
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Nos chauffeurs de maître sont rigoureusement formés aux règles de bienséance, à la discrétion et à la conduite défensive. Disponibles pour quelques heures, une journée de réunions d'affaires à Casablanca Anfa ou une semaine d'itinérance à travers le Royaume.
          </p>

          <ul className="space-y-2.5 text-xs text-zinc-400 pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>Chauffeurs polyglottes (Français, Anglais, Arabe) en costume sur-mesure</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>Mise à disposition 10h/jour ou forfait 24h avec véhicule de relève</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>Rafraîchissements d'accueil et lingettes parfumées à bord</span>
            </li>
          </ul>

          <div className="pt-3">
            <button
              onClick={() => onNavigate('reservation')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors cursor-pointer"
            >
              Réserver avec Chauffeur
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10]">
            <img
              src={noirPageImage0}
              alt="Service Chauffeur Privé Rolls Royce"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Service 2: Livraison VIP Aéroports & Palaces */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10]">
            <img
              src={noirPageImage1}
              alt="Livraison Villa Marrakech"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider">
            <Plane className="w-3.5 h-3.5" />
            <span>Livraison & Reprise Express</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Accueil Aéroports Royaux & Dépose en Villa
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Dès l'atterrissage de votre vol régulier ou jet privé aux aéroports Marrakech Menara, Casablanca Mohammed V ou Tanger Ibn Battouta, votre supercar vous attend prête à prendre la route, climatisation réglée et clé en main.
          </p>

          <ul className="space-y-2.5 text-xs text-zinc-400 pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>Accueil personnalisé avec pancarte nominative au terminal VIP</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>Prise en charge intégrale de vos bagages</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>Dépose ou reprise dans les palaces (La Mamounia, Royal Mansour, Four Seasons)</span>
            </li>
          </ul>

          <div className="pt-3">
            <button
              onClick={() => onNavigate('fleet')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors cursor-pointer"
            >
              Choisir un Véhicule à Déposer
            </button>
          </div>
        </div>
      </div>

      {/* Service 3: Escapades Atlas & Agafay */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Expériences Inoubliables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Roadtrips & Échappées Haut Atlas
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Vibrez au son du Flat-6 ou du V8 Bi-turbo sur les plus somptueuses routes sinueuses du Maroc. Nous concevons votre carnet de route sur-mesure : arrêts gastronomiques, points de vue vertigineux et assistance mécanique discrète.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl">
              <div className="text-orange-400 font-bold">Circuit Agafay Desert</div>
              <div className="text-zinc-400 text-[11px] mt-0.5">Dîner aux étoiles & dunes</div>
            </div>
            <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl">
              <div className="text-orange-400 font-bold">Col du Tizi n'Tichka</div>
              <div className="text-zinc-400 text-[11px] mt-0.5">2 260m d'altitude & virages purs</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10]">
            <img
              src={noirPageImage2}
              alt="Roadtrip Atlas Supercar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Concierge CTA */}
      <div className="bg-[#0e0f14] border border-orange-500/30 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
          Concierge Direct 24/7
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Vous préparez un événement ou un cortège officiel ?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
          Mariages de prestige, tournages de cinéma, délégations diplomatiques : notre équipe vous propose une flotte harmonisée et des chauffeurs coordonnés par radio.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/212661000000?text=Bonjour%20Conciergerie%20Noir%20Motors,%20j'ai%20un%20projet%20d'événement"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Demande Immédiate WhatsApp</span>
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl cursor-pointer"
          >
            Formulaire de Contact
          </button>
        </div>
      </div>
    </div>
  );
};
