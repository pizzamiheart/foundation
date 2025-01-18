import React from 'react';
import { Globe, ExternalLink, Gem, Lightbulb, Sprout } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { incrementEssaysBorrowed } from './lib/services/database';
import type { Author, Essay } from './lib/types';

const XLogo = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" className="text-black/80 dark:text-white/80">
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 21.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 19.644h2.039L6.486 3.24H4.298l13.312 16.404Z"
    />
  </svg>
);

const InfluenceIcon = ({ tier }: { tier: Author['influence']['tier'] }) => {
  switch (tier) {
    case 'legendary':
      return <Gem className="w-5 h-5 text-black/80 dark:text-white/80" />;
    case 'renowned':
      return <Lightbulb className="w-5 h-5 text-black/80 dark:text-white/80" />;
    case 'emerging':
      return <Sprout className="w-5 h-5 text-black/80 dark:text-white/80" />;
    default:
      return null;
  }
};

interface BloggerCardProps {
  name: string;
  bio: string;
  website: string;
  twitter: string;
  essays: Essay[];
  influence: Author['influence'];
}

export default function BloggerCard({
  name,
  bio,
  website,
  twitter,
  essays,
  influence
}: BloggerCardProps) {
  const { user } = useAuth();
  const cardId = name.toLowerCase().replace(/\s+/g, '-');

  async function handleEssayClick(essay: Essay) {
    if (user) {
      try {
        await incrementEssaysBorrowed(user.uid);
      } catch (error) {
        console.error('Error tracking essay click:', error);
      }
    }
  }

  const handleExternalClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <div
      id={cardId}
      className="relative group transition-all duration-300"
      style={{
        position: 'relative',
        '--card-shadow-light': '6px 6px 0px rgba(0,0,0,0.1)',
        '--card-shadow-dark': '6px 6px 0px rgba(255,253,245,0.15)'
      } as React.CSSProperties}
    >
      <div 
        className="block bg-[#ffffe8] dark:bg-black border-2 border-black/20 dark:border-white/20
          transition-all duration-75
          group-hover:translate-y-[3px] group-hover:translate-x-[3px]
          group-hover:shadow-[1px_1px_0px_rgba(0,0,0,0.025),inset_2px_2px_0px_rgba(255,255,255,1)]
          dark:group-hover:shadow-[1px_1px_0px_rgba(255,253,245,0.05),inset_2px_2px_0px_rgba(51,51,51,1)]
          group-hover:border-black/30 dark:group-hover:border-white/30
          dark:[box-shadow:var(--card-shadow-dark)]
          [box-shadow:var(--card-shadow-light)]
          relative rounded-xl overflow-hidden
          h-[220px] flex flex-col"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="p-3 flex flex-col h-full relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 group/author">
              <div
                className="w-14 h-14 rounded-full flex-shrink-0 border-2 border-black/20 dark:border-white/20 transition-transform group-hover:scale-105"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    #E63946 0%,
                    #E63946 20%,
                    #F77F00 20%,
                    #F77F00 40%,
                    #FCCA46 40%,
                    #FCCA46 60%,
                    #F77F00 60%,
                    #F77F00 80%,
                    #E63946 80%,
                    #E63946 100%
                  )`,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
              <div>
                <h2 className="text-base font-medieval font-extrabold text-black dark:text-white group-hover:text-red-500 transition-colors">
                  {name}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={(e) => handleExternalClick(website, e)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-black/80 dark:text-white/80" />
                  </button>
                  {twitter && (
                    <button
                      onClick={(e) => handleExternalClick(`https://twitter.com/${twitter}`, e)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <XLogo />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <InfluenceIcon tier={influence.tier} />
            </div>
          </div>

          <p className="text-xs leading-tight mb-2 text-black/80 dark:text-white/80 line-clamp-2 min-h-[28px]">
            {bio}
          </p>

          <div className="flex-1">
            <h3 className="text-sm font-bold mb-1 text-black dark:text-white">
              Featured Essays
            </h3>
            <ul className="space-y-0.5">
              {essays.map((essay, index) => (
                <li key={index} className="flex items-center gap-1 group/essay relative pr-16">
                  <ExternalLink className="w-3 h-3 flex-shrink-0 text-black/60 dark:text-white/60 group-hover/essay:text-red-500" />
                  <a
                    href={essay.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleEssayClick(essay)}
                    className="essay-link text-left text-xs font-medium text-black/80 dark:text-white/80 hover:text-red-500 hover:underline transition-colors line-clamp-1"
                  >
                    {essay.title}
                  </a>
                  <button
                    onClick={() => {
                      handleEssayClick(essay);
                      window.open(essay.url, '_blank');
                    }}
                    className="borrow-button text-[10px] font-typewriter px-1.5 py-0.5 border border-red-500/70 dark:border-red-500 text-black/80 dark:text-white/80 hover:text-red-500 hover:border-red-500 transition-colors absolute right-0"
                  >
                    Borrow
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}