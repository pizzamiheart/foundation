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
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    if (userData) {
      // Use provided userData for shared card view
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
      // Use real-time subscription for authenticated user's own card
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

  const handleShare = async () => {
    if (!user) return;
    
    const shareUrl = `${window.location.origin}/library/card/${user.uid}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {!readonly && (
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -top-3 right-4 z-20 p-1 bg-[#ffffe8] dark:bg-black rounded-full border-2 border-red-500/30 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
        >
          {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.div
            key="minimized"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-black/20 dark:border-white/20 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="w-4 h-0.5 bg-[#E63946]" />
                  <div className="w-3 h-0.5 bg-[#F77F00]" />
                  <div className="w-3.5 h-0.5 bg-[#FCCA46]" />
                </div>
                <h2 className="font-medieval text-black dark:text-white text-sm">
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
            className="bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-black/20 dark:border-white/20 overflow-hidden"
          >
            <div className="grid grid-cols-2">
              {/* Left Side - Card Details */}
              <div className="p-8 space-y-6">
                {!readonly && user && (
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-red-500 rounded-md text-black dark:text-white transition-colors font-typewriter text-sm relative"
                  >
                    Share with friends
                    {showCopied && (
                      <span className="absolute -top-8 left-0 px-2 py-1 text-xs bg-black text-white rounded whitespace-nowrap">
                        Copied to clipboard!
                      </span>
                    )}
                  </button>
                )}

                <div>
                  <h2 className="font-medieval text-xl text-black dark:text-white mb-1">
                    Foundation Library Card
                  </h2>
                  <p className="text-sm text-black/60 dark:text-white/60 font-typewriter">
                    {cardNumber}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-black/60 dark:text-white/60">MEMBER</label>
                    <p className="font-typewriter text-black dark:text-white">{firstName}</p>
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
                      <span className="text-xs text-black/40 dark:text-white/40">
                        essays and counting
                      </span>
                    </div>
                  </div>
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