import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center text-white/60 text-xs">
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
    </footer>
  );
}