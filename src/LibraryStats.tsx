import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import LibraryCard from './LibraryCard';
import LibraryCardSignup from './/LibraryCardSignUp';

export default function LibraryStats() {
  const { user } = useAuth();

  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto px-4 gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {user ? <LibraryCard /> : <LibraryCardSignup />}
    </motion.div>
  );
}