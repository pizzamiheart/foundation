import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { checkEmailVerification } from './lib/services/verification';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  requireVerification?: boolean;
}

export default function WelcomeModal({ 
  isOpen, 
  onClose, 
  email,
  requireVerification = false 
}: WelcomeModalProps) {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(false);

  const handleVerificationCheck = async () => {
    if (!user) return;
    
    setIsChecking(true);
    const isVerified = await checkEmailVerification(user);
    
    if (isVerified) {
      onClose();
    } else {
      alert('Email not verified yet. Please check your inbox.');
    }
    setIsChecking(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg 
        bg-[#ffffe8] dark:bg-black border-2 border-red-500/30 dark:border-red-500 
        shadow-[6px_6px_0px_rgba(229,58,70,0.1)] dark:shadow-[6px_6px_0px_rgba(229,58,70,0.3)]
        transition-all duration-300 ring-1 ring-red-500/30">
        
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-black/60 dark:text-red-500/60 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="prose prose-invert dark:prose-invert max-w-none">
            {requireVerification && (
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Verify Your Email
                </h2>
                <p className="text-black/80 dark:text-white/80">
                  We've sent a verification email to <strong>{email}</strong>.<br />
                  Please verify your email to access your library card.
                </p>
              </div>
            )}

            <div className="flex items-start gap-6">
              <img 
                src="/me.gif" 
                alt="Waving hello"
                className="w-24 h-24 rounded-full object-cover border-2 border-black/20 dark:border-white/20"
              />
              <div className="space-y-6 text-black/80 dark:text-white/80 flex-1">
                <p>
                  welcome to Foundation! I'm Andrew, the maker around here. the library is being built, so you're in at the ground floor - the first shelf. i'm still building the core features like building collections, lots more blogs and authors, and search and filtering.
                </p>
                
                <p>
                  if you have ideas, i'd love to hear them. send me a dm on{' '}
                  <a 
                    href="https://twitter.com/pizzamiheart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline"
                  >
                    X/Twitter
                  </a>.
                </p>
                
                <p>
                  i want this to be the go-to place on the internet for finding great and important writing. thanks for joining the library.
                </p>
              </div>
            </div>

            {requireVerification && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleVerificationCheck}
                  disabled={isChecking}
                  className="px-6 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors disabled:opacity-50"
                >
                  {isChecking ? 'Checking...' : 'Verified your email? Click here.'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}