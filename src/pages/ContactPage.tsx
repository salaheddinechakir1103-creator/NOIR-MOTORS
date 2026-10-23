import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+212 ');
  const [city, setCity] = useState('Casablanca');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      alert('Veuillez remplir votre nom et votre message.');
      return;
    }
    setIsSubmitted(true);
    showToast('Votre message a été transmis au concierge de garde.', 'success');
  };

  const agencies = [
    {
      city: 'Casablanca',
      district: "Boulevard d'Anfa & La Corniche",
      address: "142 Boulevard d'Anfa, Quartier Racine, Casablanca",
      phone: '+212 522 49 80 00',
      hours: 'Ouvert 24h/24 7j/7 (Service Voiturier & Dépose)',
    },
    {
      city: 'Marrakech',
      district: 'Hivernage & Guéliz',
      address: 'Avenue Echouhada, Hivernage (face Sofitel Palais Impérial), Marrakech',
      phone: '+212 524 43 90 00',
      hours: 'Ouvert 24h/24 7j/7 (Livraison Palace & Villa)',
    },
    {
      city: 'Tanger',
      district: 'Marina Bay',
      address: 'Port de Plaisance Marina Bay, Boulevard Mohamed VI, Tanger',
      phone: '+212 539 33 20 00',
      hours: 'Ouvert 24h/24 7j/7 (Accueil Tanger Med & Jet)',
    },
    {
      city: 'Rabat',
      district: 'Souissi',
      address: 'Avenue Mehdi Ben Barka, Souissi, Rabat',
      phone: '+212 537 75 10 00',
      hours: 'Ouvert 24h/24 7j/7 (Protocole & Délégations)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-2">
          Conciergerie Privée
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
          Contact & Agences Royales
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Notre équipe d'accueil vous reçoit dans nos salons d'apparat au Maroc ou déploie un véhicule en moins d'une heure à votre localisation.
        </p>
      </div>

      {/* Main Grid: Contact Form + Direct Phone / WhatsApp */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-[#0e0f14] border border-white/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold font-display text-white mb-2">
            Demande de Prise en Charge Prioritaire
          </h2>
          <p className="text-xs text-zinc-400 mb-6">
            Remplissez ce formulaire confidentiel ou contactez directement notre ligne VIP sur WhatsApp.
          </p>

          {isSubmitted ? (
            <div className="p-8 text-center bg-zinc-900/60 rounded-xl border border-orange-500/30 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-orange-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Transmis avec Succès</h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                Votre concierge dédié va vous contacter dans les 15 prochaines minutes. Pour toute urgence, joignez directement notre ligne 24/7 au <strong>+212 522 49 80 00</strong>.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs font-semibold uppercase text-black bg-orange-500 rounded-lg hover:bg-orange-400"
              >
                Envoyer un Autre Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1">Votre Nom & Titre *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="M. Yassine Alami"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white font-mono focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@societe.ma"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Ville de Prestation</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Agadir">Agadir</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Détail de votre Demande *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Véhicule souhaité, dates, contraintes protocolaires, aéroport..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:border-orange-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl shadow-[0_4px_20px_rgba(249,115,22,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer au Concierge de Garde</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Direct Concierge Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e0f14] border border-orange-500/30 rounded-2xl p-6 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
              Assistance Immédiate
            </span>
            <h3 className="text-lg font-bold text-white font-display">
              Lignes Dédiées 24/7
            </h3>

            <div className="space-y-4 text-xs">
              <a
                href="tel:+212522498000"
                className="flex items-center gap-3 p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-xl border border-white/5 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase">Ligne Téléphonique Directe</div>
                  <div className="font-mono font-bold text-white text-sm">+212 522 49 80 00</div>
                </div>
              </a>

              <a
                href="https://wa.me/212661000000?text=Bonjour%20Conciergerie%20Noir%20Motors"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 rounded-xl transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-emerald-400 text-[10px] uppercase font-semibold">WhatsApp Concierge VIP</div>
                  <div className="font-mono font-bold text-white text-sm">+212 661 00 00 00</div>
                </div>
              </a>

              <a
                href="mailto:contact@noirmotors.ma"
                className="flex items-center gap-3 p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-xl border border-white/5 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase">Email Officiel</div>
                  <div className="font-mono font-bold text-white text-sm">concierge@noirmotors.ma</div>
                </div>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-zinc-400 border-t border-white/5 leading-relaxed">
              Temps moyen de réponse : <strong className="text-white">Moins de 5 minutes</strong> en journée et moins de 15 minutes en astreinte de nuit.
            </div>
          </div>
        </div>
      </div>

      {/* Moroccan Agencies Grid */}
      <div>
        <h2 className="text-2xl font-bold font-display text-white mb-6">
          Nos 4 Salons d'Accueil au Maroc
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agencies.map((agency, i) => (
            <div
              key={i}
              className="bg-[#0e0f14] border border-white/10 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{agency.city}</span>
                </div>
                <h3 className="text-base font-bold text-white">{agency.district}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {agency.address}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-1 text-xs">
                <div className="font-mono text-white font-semibold">{agency.phone}</div>
                <div className="text-[10px] text-zinc-500">{agency.hours}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
