import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import LibraryCard from './LibraryCard';
import LibraryCardSignup from './LibraryCardSignUp';
import TierGuide from './TierGuide';

export default function LibraryStats() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }}
        whileHover={{
          y: [-2, 2],
          transition: {
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }
        }}
      >
        {user ? <LibraryCard /> : <LibraryCardSignup />}
      </motion.div>

      <div className="flex justify-center py-5">
        <TierGuide />
      </div>
    </div>
  );
}