import React from 'react';
import { X, Film, Clapperboard, Camera, Layers, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StoryboardModalProps {
  onClose: () => void;
}

export const StoryboardModal: React.FC<StoryboardModalProps> = ({ onClose }) => {
  const { showToast } = useApp();

  const videoPrompt = `Unreal Engine 5.5 / Blender 4.3 photorealistic automotive commercial for "NOIR MOTORS".
Subject: Exotic matte obsidian-black hypercar with exposed carbon fiber weave and warm amber/orange caliper accents.
Environment: Dramatic architectural transitions in Morocco — starting with a dark high-contrast moody studio with polished wet asphalt floor, transitioning into the twisting golden-hour canyon roads of the High Atlas, and culminating in the twilight arrival at a minimalist luxury palace in Marrakech Palmeraie.
Cinematography: ARRI Alexa 65 anamorphic 2.39:1 aspect ratio, Cook Anamorphic/i Full Frame Plus lenses, shallow depth-of-field, subtle horizontal flare streaks, 24fps motion blur, realistic atmospheric smoke and particle dust in headlight beams.
Lighting: Octane / Lumen global illumination, 3-point softbox studio lighting reflecting across the shoulder curves of the vehicle, warm Moroccan sunset rim lighting.
Color Grading: Deep blacks with 0% crushed shadows, rich warm amber highlights, cool titanium cyan undertones, Kodak 5219 film grain emulation.`;

  const shots = [
    {
      shotNumber: '01',
      title: 'Optique Matrix LED & Allumage',
      camera: 'Macro 85mm T1.5 · Arri Alexa 65',
      movement: 'Slow push-in dolly (0.5m) vers le bloc optique avant gauche',
      lighting: 'Studio sombre, réfraction sur gouttelettes d’eau et éclat anamorphic bleu',
      duration: '3.5 secondes',
      image: '/src/assets/images/video_shot_headlight_lens_1792769612084.jpg',
      audio: 'Bruit sourd de contact électrique, vrombissement montant du démarreur V8',
    },
    {
      shotNumber: '02',
      title: 'Diffuseur Carbone & Échappement Titane',
      camera: 'Low-Angle 35mm T2.0 à 15cm du sol',
      movement: 'Travelling horizontal régulier longeant les ailettes du dériveur',
      lighting: 'Bandeau OLED rouge 3D pleine largeur, lueur thermique aux canules',
      duration: '3.5 secondes',
      image: '/src/assets/images/video_shot_rear_exhaust_1792769612941.jpg',
      audio: 'Gargouillement rauque des gaz d’échappement à clapet actif ouvert',
    },
    {
      shotNumber: '03',
      title: 'Attaque de Virage — Haut Atlas',
      camera: 'Russian Arm gyro-stabilisé 50mm T1.8',
      movement: 'Poursuite latérale 3/4 avant à 90 km/h suivant la trajectoire',
      lighting: 'Soleil rasant d’or marocain découpant les arêtes de la carrosserie',
      duration: '3.5 secondes',
      image: '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
      audio: 'Montée en régime jusqu’à 8 500 tr/min et claquement de passage de rapport F1',
    },
    {
      shotNumber: '04',
      title: 'Arrivée Nocturne — Villa Palmeraie',
      camera: 'Grue Technocrane 24mm T2.8',
      movement: 'Élévation majestueuse révélant la supercar et la résidence illuminée',
      lighting: 'Reflets sur marbre extérieur poli, éclairage d’ambiance villa et ciel étoilé',
      duration: '3.5 secondes',
      image: '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg',
      audio: 'Ralenti moteur discret, clic de déverrouillage de porte et fondu musical feutré',
    },
  ];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(videoPrompt);
    showToast('Prompt cinématique copié dans le presse-papier !', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0f1016] border border-orange-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-white max-h-[90vh] overflow-y-auto space-y-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-white/10 pb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold mb-1">
            <Clapperboard className="w-4 h-4" />
            <span>Direction Artistique Cinéma 3D</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Spécifications de Production & Storyboard Découpage
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Documentation complète du film commercial 3D intégré à l'accueil (<span className="text-orange-400 font-mono font-bold">/public/videos/hero.mp4</span> — 1080p 24fps).
          </p>
        </div>

        {/* Real Video Asset Status Badge */}
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-emerald-400 font-bold">FICHIER VIDÉO RÉEL DÉPLOYÉ & OPÉRATIONNEL :</span>{' '}
              <span className="text-white">/public/videos/hero.mp4 (7.14 MB · 1920×1080 · H.264)</span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-md font-semibold text-[10px]">
            Statut : Actif
          </span>
        </div>

        {/* Shot-by-Shot Storyboard Cards */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-orange-400 font-semibold flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            <span>Découpage Plan par Plan (Timeline 14s)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shots.map((shot) => (
              <div
                key={shot.shotNumber}
                className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden p-3.5 space-y-3"
              >
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-black">
                  <img
                    src={shot.image}
                    alt={shot.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-orange-400 font-bold border border-orange-500/30">
                    PLAN {shot.shotNumber} ({shot.duration})
                  </div>
                </div>

                <div className="text-xs space-y-1.5">
                  <h4 className="font-bold text-white text-sm">{shot.title}</h4>
                  <div className="text-zinc-400 text-[11px]">
                    <strong className="text-zinc-300 font-mono">Caméra :</strong> {shot.camera}
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    <strong className="text-zinc-300 font-mono">Mouvement :</strong> {shot.movement}
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    <strong className="text-zinc-300 font-mono">Lumière :</strong> {shot.lighting}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master 3D Video Generation Prompt */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-orange-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompt Master pour Rendu 3D (Unreal 5.5 / Blender 4.3 / Veo 2)</span>
            </h3>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-zinc-300 hover:text-white bg-zinc-800 rounded-lg border border-zinc-700 transition-colors"
            >
              <Copy className="w-3 h-3" />
              <span>Copier le Prompt</span>
            </button>
          </div>

          <div className="p-4 bg-zinc-950 border border-white/10 rounded-xl text-xs font-mono text-zinc-300 leading-relaxed max-h-48 overflow-y-auto">
            {videoPrompt}
          </div>
        </div>

        {/* Close CTA */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Fermer le Storyboard
          </button>
        </div>
      </div>
    </div>
  );
};
