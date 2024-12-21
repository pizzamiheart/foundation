import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { subscribeToUserProfile } from './lib/services/database';

interface UserData {
  cardNumber: string;
  firstName: string;
  essaysBorrowed: number;
  createdAt: any;
}

interface LibraryCardProps {
  isNew?: boolean;
  readonly?: boolean;
  userData?: UserData;
}

export default function LibraryCard({ isNew = false, readonly = false, userData }: LibraryCardProps) {
  const { user } = useAuth();
  const [isMinimized, setIsMinimized] = useState(false);
  const [cardNumber, setCardNumber] = useState<string>('00000');
  const [firstName, setFirstName] = useState<string>('');
  const [essaysBorrowed, setEssaysBorrowed] = useState<number>(0);
  const [memberSince, setMemberSince] = useState<string>('');

  useEffect(() => {
    if (userData) {
      setCardNumber(userData.cardNumber || '00000');
      setFirstName(userData.firstName || '');
      setEssaysBorrowed(userData.essaysBorrowed || 0);
      
      if (userData.createdAt) {
        const date = new Date(userData.createdAt.toDate());
        setMemberSince(date.toLocaleDateString('en-US', {
          timeZone: 'America/New_York',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }));
      }
    } else if (user) {
      const unsubscribe = subscribeToUserProfile(user.uid, (data) => {
        if (data) {
          setCardNumber(data.cardNumber || '00000');
          setFirstName(data.firstName || '');
          setEssaysBorrowed(data.essaysBorrowed || 0);
          
          if (data.createdAt) {
            const date = new Date(data.createdAt.toDate());
            setMemberSince(date.toLocaleDateString('en-US', {
              timeZone: 'America/New_York',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }));
          }
        }
      });

      return () => unsubscribe();
    }
  }, [user, userData]);

  const handleShare = () => {
    if (!user) return;
    window.open(`${window.location.origin}/library/card/${user.uid}`, '_blank');
  };

  return (
    <div className="relative w-full max-w-md mx-auto scale-90">
      {!readonly && (
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -top-2 right-2 z-20 p-1 bg-[#ffffe8] dark:bg-black rounded-full border border-red-500/30 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
        >
          {isMinimized ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.div
            key="minimized"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#ffffe8] dark:bg-black rounded-md border border-black/20 dark:border-white/20 p-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="w-3 h-0.5 bg-[#E63946]" />
                  <div className="w-2 h-0.5 bg-[#F77F00]" />
                  <div className="w-2.5 h-0.5 bg-[#FCCA46]" />
                </div>
                <h2 className="font-medieval text-black dark:text-white text-xs">
                  Foundation Library Card {cardNumber}
                </h2>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={isNew ? { scale: 0.9, opacity: 0 } : false}
            animate={isNew ? { scale: 1, opacity: 1 } : false}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#ffffe8] dark:bg-black rounded-md border border-black/20 dark:border-white/20 overflow-hidden"
          >
            <div className="grid grid-cols-2">
              {/* Left Side - Card Details */}
              <div className="p-4 space-y-3">
                {!readonly && user && (
                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-red-500 rounded text-black dark:text-white transition-colors font-typewriter text-xs"
                  >
                    Share with friends
                  </button>
                )}

                <div>
                  <h2 className="font-medieval text-base text-black dark:text-white">
                    Foundation Library Card
                  </h2>
                  <p className="text-xs text-black/60 dark:text-white/60 font-typewriter">
                    {cardNumber}
                  </p>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-black/60 dark:text-white/60">MEMBER</label>
                    <p className="font-typewriter text-sm text-black dark:text-white">{firstName}</p>
                  </div>

                  <div>
                    <label className="text-[10px] text-black/60 dark:text-white/60">MEMBER SINCE</label>
                    <p className="font-typewriter text-sm text-black dark:text-white">{memberSince}</p>
                  </div>

                  <div>
                    <label className="text-[10px] text-black/60 dark:text-white/60">ESSAYS BORROWED</label>
                    <div className="flex items-baseline gap-2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={essaysBorrowed}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          className="font-typewriter text-sm text-black dark:text-white"
                        >
                          {essaysBorrowed}
                        </motion.div>
                      </AnimatePresence>
                      <span className="text-[10px] text-black/40 dark:text-white/40">
                        essays and counting
                      </span>
                    </div>
                  </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}