import React from 'react';
import { Minus } from 'lucide-react';
import { Essay } from '../../lib/types';

interface EssayInputProps {
  index: number;
  essay: Essay;
  canRemove: boolean;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof Essay, value: string) => void;
}

export default function EssayInput({ 
  index, 
  essay, 
  canRemove, 
  onRemove, 
  onChange 
}: EssayInputProps) {
  return (
    <div className="space-y-4 p-4 bg-white/5 rounded-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/60">Essay {index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-white/60 hover:text-red-500 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
        )}
      </div>
      <input
        type="text"
        value={essay.title}
        onChange={(e) => onChange(index, 'title', e.target.value)}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Essay Title"
        required
      />
      <input
        type="url"
        value={essay.url}
        onChange={(e) => onChange(index, 'url', e.target.value)}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="https://..."
        required
      />
    </div>
  );
}