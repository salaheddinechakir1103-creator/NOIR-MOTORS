import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Shield, Scale, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { compareList } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'fleet', label: 'Flotte' },
    { id: 'services', label: 'Services' },
    { 
      id: 'compare', 
      label: 'Comparateur',
      count: compareList.length 
    },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/80 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <span className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/40 flex items-center justify-center text-orange-500 font-black font-display text-sm tracking-tighter group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
            N
          </span>
          <span className="font-display font-black text-xl tracking-[0.2em] text-white uppercase group-hover:text-orange-400 transition-colors whitespace-nowrap">
            NOIR<span className="text-orange-500">.</span>MOTORS
          </span>
        </button>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-orange-500'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.count !== undefined && link.count > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-mono bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded">
                    {link.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('reservation')}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-lg shadow-[0_2px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_22px_rgba(249,115,22,0.45)] transition-all cursor-pointer whitespace-nowrap"
          >
            Réserver
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0c0d12] px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`flex items-center justify-between text-base py-2 text-left cursor-pointer ${
                currentPage === link.id ? 'text-orange-400 font-semibold' : 'text-zinc-300'
              }`}
            >
              <span>{link.label}</span>
              {link.count !== undefined && link.count > 0 && (
                <span className="px-2 py-0.5 text-xs font-mono bg-orange-500/20 text-orange-400 rounded">
                  {link.count}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('reservation')}
            className="w-full mt-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black bg-orange-500 rounded-lg cursor-pointer"
          >
            Réserver un véhicule
          </button>
        </div>
      )}
    </header>
  );
};
