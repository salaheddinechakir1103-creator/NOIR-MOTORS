import noirPageImage0 from '../../assets/images/video_shot_headlight_lens_1792769612084.jpg';
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Eye, Sparkles, Film, Compass, Box } from 'lucide-react';

interface CinematicHeroVideoProps {
  onSwitchTo3D: () => void;
  onExploreFleet: () => void;
  onBookNow: () => void;
  onOpenStoryboard: () => void;
}

export const CinematicHeroVideo: React.FC<CinematicHeroVideoProps> = ({
  onSwitchTo3D,
  onExploreFleet,
  onBookNow,
  onOpenStoryboard,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(12.2);
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Web Audio engine hum synthesizer for immersion when unmuted
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const shotTimeline = [
    { start: 0, end: 3.2, title: 'Plan 01 : Allumage Matrix LED', subtitle: 'Macro-zoom sur l’optique à signature orange Sahara' },
    { start: 3.2, end: 6.2, title: 'Plan 02 : Aérodynamique & Échappement', subtitle: 'Lame OLED rouge & diffuseur carbone à chaud' },
    { start: 6.2, end: 9.2, title: 'Plan 03 : Trajectoires du Haut Atlas', subtitle: 'Prise de virage chirurgicale en altitude' },
    { start: 9.2, end: 13.0, title: 'Plan 04 : Arrivée Palais Marrakech', subtitle: 'Dépose au crépuscule devant la Palmeraie' },
  ];

  // Sync shot index based on video current time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);
    const shot = shotTimeline.findIndex((s) => time >= s.start && time < s.end);
    if (shot !== -1 && shot !== currentShotIndex) {
      setCurrentShotIndex(shot);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      // Start luxury ambient V8 rumble sound
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // Low engine idle rumble
        gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        gainNodeRef.current = gain;
      } catch {
        // Safe fallback
      }
      setIsMuted(false);
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.3);
      }
      setIsMuted(true);
    }
  };

  const seekToShot = (index: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = shotTimeline[index].start;
    setCurrentShotIndex(index);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="noir-mobile-hero relative w-full h-[90vh] min-h-[660px] max-h-[940px] bg-black overflow-hidden select-none">
      {/* 1. ACTUAL CINEMATIC 3D MP4 VIDEO (Full-screen, Autoplay, Loop, Muted) */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => {
          setVideoLoaded(true);
          if (videoRef.current) setDuration(videoRef.current.duration || 12.2);
        }}
        poster={noirPageImage0}
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01] transition-opacity duration-1000"
      />

      {/* 2. Measured Cinematic Contrast Scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/25 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

      {/* 3. Top Zone: Cinematic Status, Shot Name & Production Badge */}
      <div className="absolute top-8 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-between gap-4">
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Film Commercial 3D · 4K Cinema</span>
              <span aria-hidden="true">·</span>
              <span>Maroc 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-[0.95]">
              DRIVE THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500">
                EXTRAORDINARY.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mt-3 leading-relaxed drop-shadow-md">
              Plongez dans l'expérience cinématographique Noir Motors. Une immersion 3D photoréaliste capturée entre les corniches atlantiques et les sommets de l'Atlas.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={onBookNow}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl shadow-[0_4px_22px_rgba(249,115,22,0.4)] transition-all cursor-pointer"
              >
                Réserver une Supercar
              </button>
              <button
                onClick={onExploreFleet}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-black/60 hover:bg-black/90 border border-white/20 rounded-xl backdrop-blur-md transition-all cursor-pointer"
              >
                Explorer la Flotte (16 Bolides)
              </button>
            </div>
          </div>

          {/* Right Floating Mode Switcher: Switch between Video Commercial & 3D Interactive Model */}
          <div className="pointer-events-auto flex flex-col items-end gap-2.5">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 flex items-center gap-1 shadow-2xl">
              <button
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-orange-500 text-black shadow-sm"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Film 3D</span>
              </button>
              <button
                onClick={onSwitchTo3D}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                title="Basculez vers le modèle 3D temps réel pour rotation 360° et changement de couleur"
              >
                <Box className="w-3.5 h-3.5 text-orange-400" />
                <span>Studio 3D Interactif</span>
              </button>
            </div>

            <button
              onClick={onOpenStoryboard}
              className="text-[11px] font-mono text-zinc-400 hover:text-orange-400 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-orange-400" />
              <span>Storyboard & Pipeline 3D</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Zone: Clean, Minimalist Cinematic Timeline Dock */}
      <div className="absolute bottom-6 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-auto bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Shot Title & Description */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-400 text-black flex items-center justify-center transition-colors shrink-0"
                aria-label={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white">
                    {shotTimeline[currentShotIndex]?.title}
                  </span>
                  <span className="text-[10px] font-mono text-orange-400 font-semibold px-1.5 py-0.5 bg-orange-500/10 rounded border border-orange-500/20">
                    Plan 0{currentShotIndex + 1}/04
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  {shotTimeline[currentShotIndex]?.subtitle}
                </div>
              </div>
            </div>

            {/* Center: Shot Selector Pills */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
              {shotTimeline.map((shot, idx) => (
                <button
                  key={idx}
                  onClick={() => seekToShot(idx)}
                  className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg transition-all ${
                    currentShotIndex === idx
                      ? 'bg-orange-500 text-black font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Right: Sound & Timecode */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={toggleMute}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  !isMuted
                    ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                    : 'bg-zinc-900 border-zinc-700/60 text-zinc-400 hover:text-white'
                }`}
                title={isMuted ? 'Activer le son ambiant moteur' : 'Couper le son'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-orange-400 animate-pulse" />}
                <span className="text-[11px] font-mono">{isMuted ? 'Muted' : 'V8 Audio'}</span>
              </button>

              <div className="text-xs font-mono text-zinc-400 tabular-nums">
                {Math.floor(currentTime)}s / {Math.floor(duration)}s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
