import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDateEST } from '././lib/utils/dateFormatting';

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
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-black/20 dark:border-white/20 overflow-hidden">
        <div className="grid grid-cols-2">
          {/* Left Side - Card Details */}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="font-medieval text-xl text-black dark:text-white mb-1">
                Foundation Library Card
              </h2>
              <p className="text-sm text-black/60 dark:text-white/60 font-typewriter">
                Card No. 00xx
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-black/60 dark:text-white/60">MEMBER</label>
                <p className="font-typewriter text-black dark:text-white">Your Name</p>
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">MEMBER SINCE</label>
                <p className="font-typewriter text-black dark:text-white">
                  {currentDate}
                </p>
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">ESSAYS BORROWED</label>
                <p className="text-xs text-black/60 dark:text-white/60 font-typewriter italic">
                  sign up and start borrowing
                </p>
              </div>

              <Link
                to="/signup"
                className="inline-block px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border-2 border-yellow-500/50 dark:border-yellow-500/70 rounded-md text-center text-sm text-black dark:text-white transition-all duration-300 hover:border-yellow-500"
              >
                Claim Your Library Card
              </Link>
            </div>
          </div>

          {/* Right Side - Decorative Lines */}
          <div className="relative">
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-[2px] w-full"
                  style={{
                    background: i % 3 === 1 ? '#E63946' : // red (from blogger card)
                              i % 3 === 2 ? '#F77F00' : // orange (from blogger card)
                                           '#FCCA46', // yellow (from blogger card)
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