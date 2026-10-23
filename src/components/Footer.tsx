import React from 'react';
import { Phone, Mail, MapPin, Shield, Clock, Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050507] border-t border-white/[0.08] text-zinc-400 text-sm mt-24">
      {/* Upper VIP Trust Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-medium text-base mb-1">Livraison dans tout le Royaume</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Casablanca, Marrakech, Rabat, Tanger & Agadir. Dépose directe à votre palace, villa ou terminal aéroportuaire.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-medium text-base mb-1">Flotte Certifiée & Protégée</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Véhicules entretenus rigoureusement en concession officielle avec assurance tous risques et assistance 24/7.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-medium text-base mb-1">Conciergerie Dédiée 24/7</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Interlocuteur VIP unique disponible sur WhatsApp et ligne directe pour vos itinéraires et demandes exclusives.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Brand Wordmark */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded bg-orange-500/10 border border-orange-500/40 flex items-center justify-center text-orange-500 font-black font-display text-xs">
              N
            </span>
            <span className="font-display font-black text-lg tracking-[0.2em] text-white uppercase">
              NOIR<span className="text-orange-500">.</span>MOTORS
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            "Drive the Extraordinary." Leader de la location de supercars et véhicules de grand prestige au Maroc.
          </p>
          <div className="pt-2 text-xs text-zinc-500">
            <span className="text-orange-400 font-semibold">Conciergerie VIP :</span> +212 522 49 80 00
          </div>
        </div>

        {/* Col 2: Navigation rapide */}
        <div>
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Navigation</h5>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-orange-400 transition-colors">
                Accueil & Studio 3D
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('fleet')} className="hover:text-orange-400 transition-colors">
                Flotte Complète (16 Supercars)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-orange-400 transition-colors">
                Services & Chauffeurs VIP
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('compare')} className="hover:text-orange-400 transition-colors">
                Comparateur de Véhicules
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('reservation')} className="hover:text-orange-400 transition-colors">
                Réservation Immédiate
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Agences au Maroc */}
        <div>
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Présence Maroc</h5>
          <ul className="space-y-2.5 text-xs text-zinc-400">
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Casablanca — Bd d'Anfa & La Corniche</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Marrakech — Hivernage & Palmeraie</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Tanger — Marina Bay & Tanger Med</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Rabat — Souissi & Agdal</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Administration & Démo */}
        <div>
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Espace Démonstration</h5>
          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
            Plateforme interactive de haute précision. Toutes les réservations et transactions présentées sont des démonstrations fonctionnelles.
          </p>
          <button
            onClick={() => onNavigate('admin')}
            className="w-full py-2 px-3 text-xs font-medium rounded-lg bg-zinc-900 border border-zinc-700/80 hover:border-orange-500/50 hover:text-white transition-all text-zinc-300"
          >
            Accéder au Dashboard Admin
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          © 2026 NOIR MOTORS MAROC. Tous droits réservés.
        </div>
        <div className="flex items-center gap-6">
          <span>Conditions Générales</span>
          <span>Politique de Confidentialité</span>
          <span>Mentions Légales</span>
        </div>
      </div>
    </footer>
  );
};
