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
import { bloggers } from './data/bloggers';
import { useAuth } from './contexts/AuthContext';

function HeaderContent() {
  const location = useLocation();
  const { user } = useAuth();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const isPublicLibraryPage = location.pathname.startsWith('/library/');
  const isSuggestionPage = location.pathname === '/suggest';

  return (
    <header className="bg-cream dark:bg-black border-b border-black/10 dark:border-white/10 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Foundation Logo" className="w-6 h-6" />
            <h1 className="text-xl sm:text-2xl font-medieval text-black dark:text-white">
              Foundation
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <HorizontalMenu onOpenAbout={() => setIsAboutOpen(true)} />
            {!isPublicLibraryPage && !isSuggestionPage && user && <LibrariansPick bloggers={bloggers} />}
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
      </div>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </header>
  );
}

function HomePage() {
  const { user, isVerified } = useAuth();
  const displayedBloggers = user && isVerified ? bloggers : bloggers.slice(0, 9);

  return (
    <>
      <div className="py-8 bg-gradient-to-b from-black/5 dark:from-black/20 to-transparent">
        <LibraryStats />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {displayedBloggers.map((blogger, index) => (
          <BloggerCard key={index} {...blogger} />
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