import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, Lightbulb, Sprout, ChevronLeft, ChevronRight, BookOpen, Book } from 'lucide-react';

interface TierInfo {
  icon: React.ReactNode;
  description: string;
  color: string;
}

const tiers: TierInfo[] = [
  {
    icon: <Gem className="w-5 h-5" />,
    description: "Pioneers: their writing and their work are widely recognized and distributed.",
    color: "from-red-500/20 to-transparent"
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Established: the things they've built, where they work, and maybe even some of their writing will be recognizable.",
    color: "from-yellow-500/20 to-transparent"
  },
  {
    icon: <Sprout className="w-5 h-5" />,
    description: "Budding: their ideas and the things they're working on/tinkering with are worth discovering.",
    color: "from-green-500/20 to-transparent"
  }
];

export default function TierGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTier, setActiveTier] = useState(-1);
  const [isClosing, setIsClosing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'ArrowLeft') {
      setActiveTier(prev => (prev > -1 ? prev - 1 : tiers.length - 1));
    } else if (e.key === 'ArrowRight') {
      setActiveTier(prev => (prev < tiers.length - 1 ? prev + 1 : -1));
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Match the animation duration
  };

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-6 px-4 py-2 bg-[#ffffe8] dark:bg-black border border-black/10 dark:border-white/10 rounded-full hover:border-red-500/50 transition-colors group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {tiers.map((tier, index) => (
          <motion.div 
            key={index}
            className="text-black/60 dark:text-white/60 group-hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            {tier.icon}
          </motion.div>
        ))}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 backdrop-blur-sm bg-black/40 dark:bg-black/60"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-lg bg-[#ffffe8] dark:bg-black border-2 border-black/20 dark:border-white/20 rounded-lg overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors z-10 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isClosing ? (
                    <motion.div
                      key="closing"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 180 }}
                      exit={{ rotateY: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-inherit group-hover:text-red-500 transition-colors"
                    >
                      <Book className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotateY: 180 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 180 }}
                      transition={{ duration: 0.3 }}
                      className="text-inherit group-hover:text-red-500 transition-colors"
                    >
                      <BookOpen className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-b ${activeTier >= 0 ? tiers[activeTier].color : 'from-red-500/10 to-transparent'} opacity-50`}
                layoutId="gradient"
                transition={{ type: "spring", damping: 20 }}
              />

              <div className="relative p-8">
                {activeTier === -1 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <h3 className="font-medieval text-2xl text-black dark:text-white mb-6">
                      How to navigate the library
                    </h3>
                    <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">
                    There are hundreds of blogs and essays in the Foundation Library. Some authors are prolific and will be familiar to you. Others will be new. These symbols are meant to be guides and provide context.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Icon */}
                    <motion.div
                      className="flex justify-center mb-6"
                      layoutId="icon"
                      transition={{ type: "spring", damping: 20 }}
                    >
                      <div className="text-black dark:text-white w-12 h-12">
                        {tiers[activeTier].icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTier}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center"
                      >
                        <p className="text-lg text-black/80 dark:text-white/80">
                          {tiers[activeTier].description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => setActiveTier(prev => (prev > -1 ? prev - 1 : tiers.length - 1))}
                    className="p-2 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveTier(-1)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        activeTier === -1
                          ? 'bg-red-500'
                          : 'bg-black/20 dark:bg-white/20 hover:bg-red-500/50'
                      }`}
                    />
                    {tiers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTier(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          index === activeTier
                            ? 'bg-red-500'
                            : 'bg-black/20 dark:bg-white/20 hover:bg-red-500/50'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTier(prev => (prev < tiers.length - 1 ? prev + 1 : -1))}
                    className="p-2 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}