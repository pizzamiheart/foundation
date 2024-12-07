import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

interface LayersIconProps {
  onShare: () => void;
  onSaveToReadwise: () => void;
}

const XLogo = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" className="text-black/80 dark:text-white/80">
    <path 
      fill="currentColor" 
      d="M18.901 1.153h3.68l-8.04 9.19L24 21.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 19.644h2.039L6.486 3.24H4.298l13.312 16.404Z"
    />
  </svg>
);

const LayersIcon = ({ onShare, onSaveToReadwise }: LayersIconProps) => {
  const controls = useAnimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = async () => {
    await controls.start('firstState');
    await controls.start('secondState');
  };

  const handleMouseLeave = () => {
    controls.start('normal');
  };

  useEffect(() => {
    controls.start('normal');
  }, [controls]);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  return (
    <div className="relative">
      <button
        className="p-2 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors rounded-full"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <motion.path
            d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
            variants={{
              normal: { y: 0 },
              firstState: { y: -9 },
              secondState: { y: 0 },
            }}
            animate={controls}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 14,
              mass: 1,
            }}
          />
          <motion.path
            d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
            variants={{
              normal: { y: 0 },
              firstState: { y: -5 },
              secondState: { y: 0 },
            }}
            animate={controls}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 14,
              mass: 1,
            }}
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black rounded-md shadow-lg border border-black/20 dark:border-white/20 overflow-hidden z-50">
          <button
            onClick={() => {
              onShare();
              setIsMenuOpen(false);
            }}
            className="w-full px-4 py-2 text-sm text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
          >
            <XLogo />
            Share on X
          </button>
          <button
            onClick={() => {
              setShowTooltip(true);
              setIsMenuOpen(false);
            }}
            className="w-full px-4 py-2 text-sm text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Save to Readwise
          </button>
        </div>
      )}

      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded-md shadow-lg whitespace-nowrap z-50"
        >
          Feature in progress
        </motion.div>
      )}
    </div>
  );
};

export default LayersIcon;