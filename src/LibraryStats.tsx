import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { subscribeToLibraryCards } from './lib/firebase';

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
      <div className="flex items-center gap-2 text-white/60 text-sm animate-pulse">
        <BookOpen className="w-4 h-4" />
        <span>Loading library stats...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-white/60 text-sm">
      <BookOpen className="w-4 h-4" />
      <span>{cardCount.toLocaleString()} library cards issued</span>
    </div>
  );
}