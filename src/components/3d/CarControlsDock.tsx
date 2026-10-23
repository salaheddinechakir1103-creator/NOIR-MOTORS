import React, { useState } from 'react';
import { CameraPreset } from './CarCanvas';
import { RotateCw, Sun, Lightbulb, ChevronDown, ChevronUp, Eye, Sliders } from 'lucide-react';

interface CarControlsDockProps {
  currentColor: string;
  onColorChange: (hex: string) => void;
  headlightsOn: boolean;
  onToggleHeadlights: () => void;
  cameraPreset: CameraPreset;
  onCameraChange: (preset: CameraPreset) => void;
  isRotating: boolean;
  onToggleRotate: () => void;
}

export const COLOR_PALETTES = [
  { name: 'Noir Onyx', hex: '#0a0a0c', border: '#27272a' },
  { name: 'Orange Sahara', hex: '#ea580c', border: '#f97316' },
  { name: 'Argent Titane', hex: '#475569', border: '#94a3b8' },
  { name: 'Rosso Maranello', hex: '#dc2626', border: '#ef4444' },
  { name: 'Blanc Atlas', hex: '#f8fafc', border: '#e2e8f0' },
  { name: 'Bleu Kasbah', hex: '#0284c7', border: '#38bdf8' },
];

export const CAMERA_PRESETS: { id: CameraPreset; label: string }[] = [
  { id: 'front-3-4', label: '3/4 Studio' },
  { id: 'side', label: 'Profil' },
  { id: 'rear', label: 'Arrière' },
  { id: 'top', label: 'Aérien' },
  { id: 'wheel', label: 'Roue & Étriers' },
];

export const CarControlsDock: React.FC<CarControlsDockProps> = ({
  currentColor,
  onColorChange,
  headlightsOn,
  onToggleHeadlights,
  cameraPreset,
  onCameraChange,
  isRotating,
  onToggleRotate,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[94vw] max-w-[880px] pointer-events-auto transition-transform duration-300">
      {/* Collapse Toggle Tab */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 rounded-t-lg backdrop-blur-md transition-colors shadow-lg"
          aria-label={isCollapsed ? 'Afficher les contrôles 3D' : 'Masquer les contrôles 3D'}
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-orange-400" />
              <span>Studio 3D Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              <span>Mode Plein Écran</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Dock */}
      {!isCollapsed && (
        <div className="glass-panel rounded-2xl p-3 md:p-4 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Section 1: Automotive Paint Swatches */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium whitespace-nowrap hidden sm:inline">
              Teinte :
            </span>
            <div className="flex items-center gap-2">
              {COLOR_PALETTES.map((palette) => {
                const isActive = currentColor.toLowerCase() === palette.hex.toLowerCase();
                return (
                  <button
                    key={palette.hex}
                    onClick={() => onColorChange(palette.hex)}
                    title={palette.name}
                    aria-label={`Choisir la teinte ${palette.name}`}
                    className={`w-7 h-7 rounded-full transition-all duration-200 cursor-pointer relative ${
                      isActive
                        ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-black scale-110'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: palette.hex,
                      border: `1.5px solid ${palette.border}`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Section 2: Cinematic Camera Views */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1 px-1 bg-black/40 rounded-xl border border-white/5">
            {CAMERA_PRESETS.map((preset) => {
              const isActive = cameraPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onCameraChange(preset.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-orange-500 text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Section 3: Interactive Toggles (Headlights, 360 Rotation) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Headlights Toggle */}
            <button
              onClick={onToggleHeadlights}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                headlightsOn
                  ? 'bg-orange-500/15 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.25)]'
                  : 'bg-zinc-900 border-zinc-700/60 text-zinc-400 hover:text-white'
              }`}
              title="Allumer ou éteindre les projecteurs LED"
            >
              <Lightbulb className={`w-3.5 h-3.5 ${headlightsOn ? 'text-orange-400' : 'text-zinc-500'}`} />
              <span className="hidden sm:inline">Phares LED</span>
            </button>

            {/* Auto-Rotate Toggle */}
            <button
              onClick={onToggleRotate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                isRotating
                  ? 'bg-orange-500/15 border-orange-500 text-orange-400'
                  : 'bg-zinc-900 border-zinc-700/60 text-zinc-400 hover:text-white'
              }`}
              title="Activer la rotation 360°"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin text-orange-400' : 'text-zinc-500'}`} />
              <span className="hidden sm:inline">360°</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
