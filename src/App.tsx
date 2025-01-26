import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import BloggerCard from './BloggerCard';
import SuggestionForm from './components/suggestion/SuggestionForm';
import LibrariansPick from './LibrariansPick';
import LibraryStats from './LibraryStats';
import Footer from './Footer';
import AboutModal from './AboutModal';
import HorizontalMenu from './HorizontalMenu';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import UserMenu from './UserMenu';
import SharedLibraryCard from './SharedLibraryCard';
import TierFilter from './TierFilter';
import SearchBar from './components/Search/SearchBar';
import { useAuth } from './contexts/AuthContext';
import { bloggers } from './data/bloggers';
import type { Author } from './lib/types';

function HeaderContent() {
  const location = useLocation();
  const { user, isVerified } = useAuth();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const isPublicLibraryPage = location.pathname.startsWith('/library/');
  const isSuggestionPage = location.pathname === '/suggest';

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    // TODO: Implement search
    setIsSearching(false);
  };

  return (
    <header className="bg-cream dark:bg-black border-b border-black/10 dark:border-white/10 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8 flex-1">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Foundation Logo" className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-medieval text-black dark:text-white">
                Foundation
              </h1>
            </Link>

            {/* Search Bar */}
            {user && isVerified && !isPublicLibraryPage && !isSuggestionPage && (
              <div className="hidden md:block flex-1 max-w-md">
                <SearchBar onSearch={handleSearch} isLoading={isSearching} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <HorizontalMenu onOpenAbout={() => setIsAboutOpen(true)} />
            {user ? (
              <UserMenu />
            ) : (
              <Link 
                to="/signin"
                className="text-xs sm:text-sm px-3 py-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {user && isVerified && !isPublicLibraryPage && !isSuggestionPage && (
          <div className="md:hidden mt-4">
            <SearchBar onSearch={handleSearch} isLoading={isSearching} />
          </div>
        )}
      </div>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </header>
  );
}

function HomePage() {
  const { user, isVerified } = useAuth();
  const [selectedTier, setSelectedTier] = useState<Author['influence']['tier'] | 'all'>('all');

  // Only filter by tier if user is signed in and verified
  const filteredBloggers = user && isVerified
    ? bloggers.filter(blogger => selectedTier === 'all' || blogger.influence.tier === selectedTier)
    : bloggers;

  // Always limit for non-signed-in or non-verified users
  const displayedBloggers = user && isVerified ? filteredBloggers : filteredBloggers.slice(0, 9);

  return (
    <>
      <div className="py-8 bg-gradient-to-b from-black/5 dark:from-black/20 to-transparent">
        <LibraryStats />
      </div>
      
      {/* Only show controls if user is signed in and verified */}
      {user && isVerified && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <LibrariansPick bloggers={filteredBloggers} selectedTier={selectedTier} />
          </div>
          <TierFilter selectedTier={selectedTier} onChange={setSelectedTier} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {displayedBloggers.map((blogger, index) => (
          <BloggerCard 
            key={index}
            name={blogger.name}
            bio={blogger.bio}
            website={blogger.website}
            twitter={blogger.twitter}
            essays={blogger.essays}
            influence={blogger.influence}
          />
        ))}
      </div>
      
      {(!user || !isVerified) && (
        <div className="text-center py-12 px-4">
          <div className="max-w-xl mx-auto bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-black/20 dark:border-white/20 p-6">
            <h2 className="text-xl font-medieval text-black dark:text-white mb-4">
              Want to see more great writers?
            </h2>
            <p className="text-black/80 dark:text-white/80 mb-6">
              Sign up for a library card to access all essays and writers in the Foundation library.
            </p>
            <Link
              to="/signup"
              className="inline-block px-6 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors"
            >
              Get Your Library Card
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-b from-cream to-white dark:from-[#1A1A1A] dark:to-[#121212] flex flex-col text-black dark:text-white">
            <HeaderContent />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/suggest" element={<SuggestionForm />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/library/card/:userId" element={<SharedLibraryCard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}