import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { searchEssays } from '../../lib/services/openai';
import SearchResults from './SearchResults';
import type { SearchResult } from '../../lib/types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [displayLimit, setDisplayLimit] = useState(5);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setError(null);
      setTotalResults(0);
      return;
    }

    setSearching(true);
    setError(null);
    
    try {
      const { results: searchResults, total } = await searchEssays(searchQuery, displayLimit);
      setResults(searchResults);
      setTotalResults(total);
      if (searchResults.length === 0) {
        setError('No results found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleLoadMore = async () => {
    setDisplayLimit(prev => prev + 5);
    if (query) {
      handleSearch(query);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Immediately clear results if query is empty
    if (!newQuery.trim()) {
      setResults([]);
      setError(null);
      setTotalResults(0);
      return;
    }
  };

  // Debounce search for non-empty queries
  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, displayLimit]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setTotalResults(0);
    setDisplayLimit(5);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search essays..."
          className="w-full px-4 py-2 pl-10 bg-white/50 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-black/40 dark:text-white/40" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-2.5 text-black/40 dark:text-white/40 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      <SearchResults 
        results={results}
        isLoading={searching}
        error={error}
        onLoadMore={handleLoadMore}
        hasMore={results.length < totalResults}
      />
    </div>
  );
}