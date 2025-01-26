import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, AlertCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { incrementEssaysBorrowed } from '../../lib/services/database';
import type { SearchResult } from '../../lib/types';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export default function SearchResults({ 
  results, 
  isLoading,
  error,
  onLoadMore,
  hasMore = false 
}: SearchResultsProps) {
  const { user } = useAuth();

  const handleEssayClick = async (e: React.MouseEvent, result: SearchResult) => {
    e.preventDefault();
    
    if (user) {
      try {
        await incrementEssaysBorrowed(user.uid);
      } catch (error) {
        console.error('Error tracking essay click:', error);
      }
    }
    
    window.open(result.essayUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="absolute top-full mt-2 w-full bg-[#ffffe8] dark:bg-black border-2 border-black/20 dark:border-white/20 rounded-md shadow-lg p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={`loading-${i}`} className="space-y-2">
              <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-black/10 dark:bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-full mt-2 w-full bg-[#ffffe8] dark:bg-black border-2 border-black/20 dark:border-white/20 rounded-md shadow-lg p-4">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full mt-2 w-full bg-[#ffffe8] dark:bg-black border-2 border-black/20 dark:border-white/20 rounded-md shadow-lg">
      <div className="max-h-[300px] overflow-y-auto">
        <div className="divide-y divide-black/10 dark:divide-white/10">
          <AnimatePresence>
            {results.map((result, index) => (
              <motion.a
                key={`${result.authorName}-${result.essayTitle}-${index}`}
                href={result.essayUrl}
                onClick={(e) => handleEssayClick(e, result)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="block p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-black dark:text-white mb-1">
                      {result.essayTitle}
                    </h3>
                    <p className="text-xs text-black/60 dark:text-white/60">
                      by {result.authorName}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-black/40 dark:text-white/40 flex-shrink-0 transform group-hover:rotate-45 transition-transform" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {hasMore && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onLoadMore}
          className="w-full p-3 text-sm text-black/60 dark:text-white/60 hover:text-red-500 transition-colors border-t border-black/10 dark:border-white/10 flex items-center justify-center gap-2"
        >
          <span>Show more results</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}