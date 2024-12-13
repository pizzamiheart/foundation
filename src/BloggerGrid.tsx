import React from 'react';
import { useAuth } from './contexts/AuthContext';
import BloggerCard from './BloggerCard';
import { bloggers } from './data/bloggers';

const PREVIEW_COUNT = 9; // Changed from 12 to 9

export default function BloggerGrid() {
  const { user, isVerified } = useAuth();
  const displayedBloggers = user && isVerified ? bloggers : bloggers.slice(0, PREVIEW_COUNT);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedBloggers.map((blogger, index) => (
          <BloggerCard key={index} {...blogger} />
        ))}
      </div>

      {(!user || !isVerified) && (
        <div className="text-center py-12 px-4">
          <div className="max-w-xl mx-auto bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-black/20 dark:border-white/20 p-6">
            <h2 className="text-xl font-medieval text-black dark:text-white mb-4">
              Want access to whole library?
            </h2>
            <a
              href="/signup"
              className="inline-block px-6 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors"
            >
              Sign up For a Library Card
            </a>
          </div>
        </div>
      )}
    </>
  );
}