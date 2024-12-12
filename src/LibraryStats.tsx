import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import { Link } from 'react-router-dom';
import LibraryCard from './LibraryCard';

export default function LibraryStats() {
  const { user } = useAuth();

  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto px-4 gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {user ? (
        <LibraryCard />
      ) : (
        <div className="w-full max-w-xl bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-[#FCCA46] p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <div className="w-4 h-0.5 bg-red-500" />
                <div className="w-3 h-0.5 bg-orange-500" />
                <div className="w-3.5 h-0.5 bg-yellow-500" />
              </div>
              <h2 className="font-medieval text-lg sm:text-xl text-black dark:text-white">
                Welcome to Foundation
              </h2>
            </div>
            
            <div className="space-y-4 w-full max-w-sm">
              <div className="text-center space-y-2">
                <p className="text-black dark:text-white font-bold text-base sm:text-lg">
                  Join the Internet's Library of Great Writing
                </p>
              </div>

              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors"
              >
                Sign Up for a Library Card
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}