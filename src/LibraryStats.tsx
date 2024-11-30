import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { subscribeToLibraryCards } from './lib/firebase';
import LibraryCard from './LibraryCard';

export default function LibraryStats() {
  const [cardCount, setCardCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToLibraryCards((count) => {
      setCardCount(count);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-white/60 text-sm animate-pulse">
        <span>Loading stats...</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LibraryCard count={cardCount} />
    </motion.div>
  );
}