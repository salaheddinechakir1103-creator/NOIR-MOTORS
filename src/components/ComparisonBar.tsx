import React from 'react';
import { useApp } from '../context/AppContext';
import { Scale, X, ArrowRight } from 'lucide-react';

interface ComparisonBarProps {
  onCompareNow: () => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({ onCompareNow }) => {
  const { compareList, vehicles, removeFromCompare, clearCompare } = useApp();

  if (compareList.length === 0) return null;

  const comparedVehicles = vehicles.filter((v) => compareList.includes(v.id));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92vw] max-w-2xl bg-zinc-950/95 border border-orange-500/40 rounded-2xl p-3 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4">
      {/* Thumbnails of compared cars */}
      <div className="flex items-center gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 text-xs text-orange-400 font-semibold uppercase tracking-wider pl-1 whitespace-nowrap">
          <Scale className="w-4 h-4 text-orange-500" />
          <span>Comparateur ({compareList.length}/3)</span>
        </div>

        <div className="flex items-center gap-2">
          {comparedVehicles.map((v) => (
            <div
              key={v.id}
              className="relative flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-lg p-1.5 pr-2.5 shrink-0"
            >
              <img
                src={v.image}
                alt={v.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded object-cover"
              />
              <span className="text-xs text-zinc-200 font-medium max-w-[110px] truncate">
                {v.name}
              </span>
              <button
                onClick={() => removeFromCompare(v.id)}
                className="text-zinc-500 hover:text-white p-0.5"
                title="Retirer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={clearCompare}
          className="text-xs text-zinc-400 hover:text-white px-2 py-1 transition-colors"
        >
          Vider
        </button>
        <button
          onClick={onCompareNow}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors cursor-pointer"
        >
          <span>Comparer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
