import react from 'react';
import { Share2 } from 'lucide-react';

interface sharebuttonprops {
  userid: string;
}

export default function sharebutton({ userid }: sharebuttonprops) {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/library/card/${userid}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="absolute top-4 right-16 z-20 p-1 bg-[#ffffe8] dark:bg-black rounded-full border-2 border-red-500/30 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
      title="share library card"
    >
      <Share2 className="w-4 h-4" />
    </button>
  );
}