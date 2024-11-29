import React from 'react';
import { Globe, ExternalLink, Share2 } from 'lucide-react';
import { incrementLibraryCards } from './lib/firebase';

interface Essay {
  title: string;
  url: string;
}

interface BloggerProps {
  name: string;
  bio: string;
  website: string;
  twitter?: string;
  essays: Essay[];
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const getProfileStripes = (): React.CSSProperties => ({
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
});

const XLogo = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" className="text-white/80 hover:text-red-500 transition-colors">
    <path 
      fill="currentColor" 
      d="M18.901 1.153h3.68l-8.04 9.19L24 21.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 19.644h2.039L6.486 3.24H4.298l13.312 16.404Z"
    />
  </svg>
);

export default function BloggerCard({
  name,
  bio,
  website,
  twitter,
  essays,
  bgColor,
  textColor,
  borderColor,
}: BloggerProps) {
  const cardId = name.toLowerCase().replace(/\s+/g, '-');

  const handleEssayClick = async () => {
    try {
      await incrementLibraryCards();
    } catch (error) {
      console.error('Error incrementing library cards:', error);
    }
  };

  const handleShare = () => {
    const tweetText = `just read an essay by ${twitter ? `@${twitter}` : name} on foundation! lots of interesting writers and thinkers in (mostly) tech to check out :)`;
    const shareUrl = `${window.location.origin}/#${cardId}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div 
      id={cardId}
      className={`rounded-lg overflow-hidden transition-all duration-75 
        bg-black border-2 border-white/20
        shadow-[6px_6px_0px_rgba(255,253,245,0.15)] 
        hover:shadow-[3px_3px_0px_rgba(255,253,245,0.1),inset_1px_1px_0px_rgba(51,51,51,0.9)] 
        hover:translate-y-[3px] hover:translate-x-[3px]
        active:shadow-[1px_1px_0px_rgba(255,253,245,0.05),inset_2px_2px_0px_rgba(51,51,51,1)] 
        active:translate-y-[5px] active:translate-x-[5px]
        hover:border-white/30`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-16 h-16 rounded-full flex-shrink-0 border-2 border-white/20"
              style={getProfileStripes()}
            />
            <div>
              <h2 className="text-lg font-medieval font-extrabold text-white">
                {name}
              </h2>
              <div className="flex gap-2">
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-red-500 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
                {twitter && (
                  <a
                    href={`https://twitter.com/${twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-red-500 transition-colors"
                  >
                    <XLogo />
                  </a>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="p-2 text-white/80 hover:text-red-500 transition-colors border border-white/20 hover:border-red-500 rounded-full"
            title="Share on Twitter"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm mb-3 text-white/80 line-clamp-2">
          {bio}
        </p>

        <div>
          <h3 className="text-sm font-bold mb-2 text-white">Featured Essays</h3>
          <ul className="space-y-1.5">
            {essays.map((essay, index) => (
              <li key={index} className="flex items-center gap-1.5 group relative pr-24">
                <ExternalLink className="w-3 h-3 flex-shrink-0 text-white/60 group-hover:text-red-500" />
                <a
                  href={essay.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleEssayClick}
                  className="essay-link text-xs font-medium text-white/80 hover:text-red-500 hover:underline transition-colors line-clamp-1"
                >
                  {essay.title}
                </a>
                <button
                  onClick={() => {
                    handleEssayClick();
                    window.open(essay.url, '_blank');
                  }}
                  className="borrow-button text-xs font-typewriter px-3 py-1 border border-red-500 text-white/80 hover:text-red-500 hover:border-red-500 transition-colors absolute right-0"
                >
                  Borrow
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}