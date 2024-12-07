import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function LibraryStats() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `form-name=library-card&email=${encodeURIComponent(email)}`
      });

      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center w-full max-w-xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full bg-black rounded-lg border border-red-500/30 p-4 sm:p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-0.5">
              <div className="w-4 h-0.5 bg-red-500" />
              <div className="w-3 h-0.5 bg-orange-500" />
              <div className="w-3.5 h-0.5 bg-yellow-500" />
            </div>
            <h2 className="font-medieval text-lg sm:text-xl text-white">Foundation Library is in Development</h2>
          </div>
          
          <div className="space-y-4 w-full max-w-sm">
            <div className="text-center space-y-2">
              <p className="text-white font-bold text-base sm:text-lg">
                Get on the waitlist to have a say in it.
              </p>
              <p className="text-white/80 text-xs sm:text-sm">
                While you're here, browse and borrow an essay.
              </p>
            </div>

            {!isSubscribed ? (
              <form
                name="library-card"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="flex gap-2 w-full mt-2"
              >
                <input type="hidden" name="form-name" value="library-card" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-3 py-1.5 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3 py-1.5 bg-white/10 hover:bg-red-500 border border-white/20 rounded-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5 text-sm whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Register</span>
                </button>
              </form>
            ) : (
              <p className="text-white/60 text-sm text-center">
                Thanks! I'll keep you updated on Foundation's development.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}