import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuccessMessage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-lg overflow-hidden bg-[#ffffe8] dark:bg-black border-2 border-black/20 dark:border-white/20 p-8 text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Thank you!</h2>
        <p className="text-black/80 dark:text-white/80 mb-6">Your suggestion has been submitted successfully.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors"
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}