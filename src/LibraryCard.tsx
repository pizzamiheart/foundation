import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LibraryCardProps {
  count: number;
}

export default function LibraryCard({ count }: LibraryCardProps) {
  const digits = count.toString().split('');

  return (
    <div className="inline-flex flex-col items-center bg-black/50 rounded-lg border border-red-500/50 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex flex-col gap-0.5">
          <div className="w-4 h-0.5 bg-red-500" />
          <div className="w-3 h-0.5 bg-orange-500" />
          <div className="w-3.5 h-0.5 bg-yellow-500" />
        </div>
        <h2 className="font-medieval text-white text-lg">Foundation Library</h2>
      </div>
      
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {digits.map((digit, index) => (
            <div
              key={index}
              className="relative w-6 h-8 bg-black/30 rounded-sm border border-red-500/30 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={digit}
                  initial={{ y: -40 }}
                  animate={{ y: 0 }}
                  exit={{ y: 40 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className="absolute inset-0 flex items-center justify-center font-typewriter text-lg text-white/90"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </div>
        <span className="font-typewriter text-sm text-white/70">essays borrowed</span>
      </div>
    </div>
  );
}