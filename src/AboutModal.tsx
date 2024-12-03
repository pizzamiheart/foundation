import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg 
          bg-black border-2 border-red-500 shadow-[6px_6px_0px_rgba(229,58,70,0.3)]
          transition-all duration-300 ring-1 ring-red-500/30"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] to-transparent pointer-events-none" />
        
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-red-500/60 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-2xl font-medieval text-red-500 mb-8">
              we are in the age of curation.
            </p>
            
            <div className="space-y-6 text-white/80">
              <p>
                it has never been easier, faster, or cheaper to create something. and, increasingly, anything you want.
              </p>
              
              <p>
                but not all creation should be fast. things that last are meant to be labored over. they are revisited in seasons. their worth is measured in years, not conversions.
              </p>
              
              <p>
                much of what is shaping our now, and our future, is our ability to think, write, and communicate our ideas. our ideas tell others about who we are. they are our signal to the machine god that we know the way forward because we've written down the past.
              </p>

              <p>
                the way forward into the future is being shaped by technology that is more like us than anything we've ever created. it makes everything else seem alien in a way. in this future, should we begin to forget who we are, we'll do well to read what has been written - to revist our ideas - and remember that we have imagination and can shape the world.
              </p>
              
              <p>
                Foundation is a library of those ideas. they come from some of the more (most?) significant people in tech who brought us here.
              </p>
              
              <p>
                treat it like your own library on the internet. borrow whatever you'd like - as many as you like. there are no return dates or late fees.
              </p>
              
              <p>
                the Foundation library is growing because we keep writing and working on these ideas in progress. so come back often and check out something new.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}