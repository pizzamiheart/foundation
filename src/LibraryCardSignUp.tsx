import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDateEST } from './lib/utils/dateFormatting';

export default function LibraryCardSignup() {
  const [currentDate, setCurrentDate] = useState(formatDateEST());

  useEffect(() => {
    // Update date at midnight EST
    const updateDate = () => {
      setCurrentDate(formatDateEST());
    };

    // Calculate time until next midnight EST
    const now = new Date();
    const est = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const tomorrow = new Date(est);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - est.getTime();

    // Set initial timeout for midnight
    const timeout = setTimeout(updateDate, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto scale-90"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#ffffe8] dark:bg-black rounded-md border border-black/20 dark:border-white/20 overflow-hidden">
        <div className="grid grid-cols-2">
          {/* Left Side - Card Details */}
          <div className="p-4 space-y-3">
            <div>
              <h2 className="font-medieval text-base text-black dark:text-white">
                Foundation Library Card
              </h2>
              <p className="text-xs text-black/60 dark:text-white/60 font-typewriter">
                Card No. 00xx
              </p>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-black/60 dark:text-white/60">MEMBER</label>
                <p className="font-typewriter text-sm text-black dark:text-white">Your Name</p>
              </div>

              <div>
                <label className="text-[10px] text-black/60 dark:text-white/60">MEMBER SINCE</label>
                <p className="font-typewriter text-sm text-black dark:text-white">
                  {currentDate}
                </p>
              </div>

              <div>
                <label className="text-[10px] text-black/60 dark:text-white/60">ESSAYS BORROWED</label>
                <p className="text-[10px] text-black/60 dark:text-white/60 font-typewriter italic">
                  sign up and start borrowing
                </p>
              </div>

              <Link
                to="/signup"
                className="inline-block px-3 py-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-yellow-500/50 dark:border-yellow-500/70 rounded text-center text-xs text-black dark:text-white transition-all duration-300 hover:border-yellow-500"
              >
                Claim Your Library Card
              </Link>
            </div>
          </div>

          {/* Right Side - Decorative Lines */}
          <div className="relative">
            <div className="absolute inset-0 flex flex-col justify-between p-2">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-[1px] w-full"
                  style={{
                    background: i % 3 === 1 ? '#E63946' : // red
                              i % 3 === 2 ? '#F77F00' : // orange
                                           '#FCCA46', // yellow
                    opacity: 0.4,
                    filter: 'blur(0.25px)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}