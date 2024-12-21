import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  userId: string;
}

export default function ShareButton({ userId }: ShareButtonProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/library/card/${userId}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="absolute top-4 right-16 z-20 p-1 bg-[#ffffe8] dark:bg-black rounded-full border-2 border-red-500/30 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
      title="Share library card"
    >
      <Share2 className="w-4 h-4" />
      {showCopied && (
        <span className="absolute right-full mr-2 px-2 py-1 text-xs bg-black dark:bg-white text-white dark:text-black rounded">
          Copied!
        </span>
      )}
    </button>
  );
}