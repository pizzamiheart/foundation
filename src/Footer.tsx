import React, { useState } from 'react';
import { BookOpen, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const encode = (data: Record<string, any>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "library-card",
          email
        })
      });

      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-4">
          {!isSubscribed ? (
            <div className="w-full max-w-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-500" />
                  <h3 className="text-base font-medieval text-white">Library Card Registration</h3>
                </div>
                <form
                  name="library-card"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="flex gap-2 w-full sm:w-auto"
                >
                  <input type="hidden" name="form-name" value="library-card" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-3 py-1.5 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5 text-sm whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-white/60">
                Your library card has been registered. We'll notify you when new volumes arrive.
              </p>
            </div>
          )}
          <div className="text-center text-white/60 text-xs">
            i might send you an email in the future with more essays or blogs
            <br />
            <span className="opacity-75">
              made by{' '}
              <a
                href="https://x.com/pizzamiheart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 hover:underline transition-colors"
              >
                @pizzamiheart
              </a>
            </span>
          </div>
        </div>
      </div>
      {/* Hidden form for Netlify */}
      <form name="library-card" data-netlify="true" hidden>
        <input type="email" name="email" />
      </form>
    </footer>
  );
}