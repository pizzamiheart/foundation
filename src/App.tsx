import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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
import { bloggers } from './data/bloggers';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { user, isVerified } = useAuth();

  // Only show first 9 bloggers for non-signed in or non-verified users
  const displayedBloggers = user && isVerified ? bloggers : bloggers.slice(0, 9);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white dark:from-[#1A1A1A] dark:to-[#121212] flex flex-col text-black dark:text-white">
      <header className="bg-cream dark:bg-black border-b border-black/10 dark:border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link to="/" className="flex flex-col shrink-0">
                <div className="flex items-center gap-3">
                  <img src="/logo.svg" alt="Foundation Logo" className="w-6 h-6" />
                  <h1 className="text-xl sm:text-2xl font-medieval text-black dark:text-white">
                    Foundation
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-black/80 dark:text-white/80 italic mt-1">
                  the internet's library for great writing
                </p>
              </Link>
              <div className="flex items-center justify-center w-full sm:w-auto gap-2 sm:gap-4">
                <HorizontalMenu onOpenAbout={() => setIsAboutOpen(true)} />
                <LibrariansPick bloggers={bloggers} />
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <Routes>
          <Route path="/" element={
            <>
              <div className="py-8 bg-gradient-to-b from-black/5 dark:from-black/20 to-transparent">
                <div className="max-w-7xl mx-auto">
                  <LibraryStats />
                </div>
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
                      Want access to the whole Foundation Library?
                    </h2>
                    <Link
                      to="/signup"
                      className="inline-block px-6 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors"
                    >
                      Sign up for a Library Card
                    </Link>
                  </div>
                </div>
              )}
            </>
          } />
          <Route path="/suggest" element={<SuggestionForm />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>

      <Footer />
      
      <AboutModal 
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;