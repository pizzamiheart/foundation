import React from 'react';
import { ChevronDown, Gem, Lightbulb, Sprout } from 'lucide-react';
import type { Author } from './lib/types';

type Tier = Author['influence']['tier'] | 'all';

interface TierFilterProps {
  selectedTier: Tier;
  onChange: (tier: Tier) => void;
}

const tiers: { value: Tier; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'All Writers', icon: null },
  { value: 'legendary', label: 'Legendary', icon: <Gem className="w-4 h-4" /> },
  { value: 'renowned', label: 'Renowned', icon: <Lightbulb className="w-4 h-4" /> },
  { value: 'emerging', label: 'Emerging', icon: <Sprout className="w-4 h-4" /> },
];

export default function TierFilter({ selectedTier, onChange }: TierFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = tiers.find(tier => tier.value === selectedTier);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#ffffe8] dark:bg-black border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white hover:border-red-500 transition-colors"
      >
        {selectedOption?.icon}
        <span className="text-sm">{selectedOption?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 bg-[#ffffe8] dark:bg-black border border-black/20 dark:border-white/20 rounded-md shadow-lg overflow-hidden">
          {tiers.map((tier) => (
            <button
              key={tier.value}
              onClick={() => {
                onChange(tier.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                selectedTier === tier.value ? 'text-red-500' : 'text-black dark:text-white'
              }`}
            >
              {tier.icon}
              {tier.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}