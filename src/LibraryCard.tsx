import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { subscribeToUserProfile } from './lib/services/database';

interface LibraryCardProps {
  isNew?: boolean;
}

export default function LibraryCard({ isNew = false }: LibraryCardProps) {
  const { user } = useAuth();
  const [isMinimized, setIsMinimized] = useState(false);
  const [cardNumber, setCardNumber] = useState<string>('00000');
  const [firstName, setFirstName] = useState<string>('');
  const [essaysBorrowed, setEssaysBorrowed] = useState<number>(0);
  
  const memberSince = new Date().toLocaleDateString('en-US', { 
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    if (user) {
      // Subscribe to real-time updates
      const unsubscribe = subscribeToUserProfile(user.uid, (data) => {
        if (data) {
          setCardNumber(data.cardNumber || '00000');
          setFirstName(data.firstName || '');
          setEssaysBorrowed(data.essaysBorrowed || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute -top-3 right-4 z-20 p-1 bg-[#ffffe8] dark:bg-black rounded-full border-2 border-red-500/30 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
      >
        {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.div
            key="minimized"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-red-500/30 p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="w-4 h-0.5 bg-red-500" />
                  <div className="w-3 h-0.5 bg-orange-500" />
                  <div className="w-3.5 h-0.5 bg-yellow-500" />
                </div>
                <h2 className="font-medieval text-black dark:text-white text-sm">Foundation Library Card 007-{cardNumber}</h2>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={isNew ? { scale: 0.9, opacity: 0 } : false}
            animate={isNew ? { scale: 1, opacity: 1 } : false}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-red-500/30 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="w-4 h-0.5 bg-red-500" />
                  <div className="w-3 h-0.5 bg-orange-500" />
                  <div className="w-3.5 h-0.5 bg-yellow-500" />
                </div>
                <h2 className="font-medieval text-black dark:text-white text-lg">Foundation Library Card</h2>
              </div>
              <div className="text-xs text-black/60 dark:text-white/60 font-typewriter">
                {cardNumber}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-black/60 dark:text-white/60">MEMBER</label>
                <p className="font-typewriter text-black dark:text-white">{firstName || 'Member'}</p>
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">MEMBER SINCE</label>
                <p className="font-typewriter text-black dark:text-white">{memberSince}</p>
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">ESSAYS BORROWED</label>
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={essaysBorrowed}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      className="font-typewriter text-black dark:text-white"
                    >
                      {essaysBorrowed}
                    </motion.div>
                  </AnimatePresence>
                  <span className="text-xs text-black/40 dark:text-white/40">essays and counting</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-black/60 dark:text-white/60 font-typewriter">
                probably some of the most important writing on the internet
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}