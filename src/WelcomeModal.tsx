import React from 'react';
import { X } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg 
          bg-[#ffffe8] dark:bg-black border-2 border-red-500/30 dark:border-red-500 
          shadow-[6px_6px_0px_rgba(229,58,70,0.1)] dark:shadow-[6px_6px_0px_rgba(229,58,70,0.3)]
          transition-all duration-300 ring-1 ring-red-500/30"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.01] dark:from-red-500/[0.03] to-transparent pointer-events-none" />
        
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-black/60 dark:text-red-500/60 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="prose prose-invert dark:prose-invert max-w-none">
            <div className="flex items-start gap-6">
              <img 
                src="/me.gif" 
                alt="Waving hello"
                className="w-24 h-24 rounded-full object-cover border-2 border-black/20 dark:border-white/20"
              />
              <div className="space-y-6 text-black/80 dark:text-white/80 flex-1">
                <p>
                  welcome to Foundation! I'm Andrew, the maker of Foundation. the library is being built, so you're in at the ground floor. i'm still building the core features like saving blogs to a collection, lots more blogs and authors, and search and filtering.
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
          </div>
        </div>
      </div>
    </div>
  );
}