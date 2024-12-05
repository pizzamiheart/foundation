import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Library, HelpCircle } from 'lucide-react';
import BloggerCard from './BloggerCard';
import SuggestionForm from './components/suggestion/SuggestionForm';
import LibrariansPick from './LibrariansPick';
import Footer from './Footer';
import AboutModal from './AboutModal';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import { bloggers } from './data/bloggers';

interface HeaderProps {
  isHomePage: boolean;
  onOpenAbout: () => void;
}

function Header({ isHomePage, onOpenAbout }: HeaderProps) {
  return (
    <header className="bg-cream dark:bg-black border-b border-black/10 dark:border-white/10 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex flex-col">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Foundation Logo" className="w-6 h-6" />
                <h1 className="text-2xl font-medieval text-black dark:text-white">
                  Foundation
                </h1>
              </div>
              <p className="text-sm text-black/80 dark:text-white/80 italic mt-1">
                probably some of the most important writing on the internet
              </p>
            </Link>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onOpenAbout}
                  className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-red-500 text-black/60 dark:text-white/60 hover:bg-red-500 hover:text-white transition-colors"
                  aria-label="About Foundation"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
              {isHomePage && (
                <>
                  <LibrariansPick bloggers={bloggers} />
                  <Link
                    to="/suggest"
                    className="text-sm text-black/80 dark:text-white/80 hover:text-red-500 transition-colors whitespace-nowrap"
                  >
                    Make a suggestion →
                  </Link>
                </>
              )}
              {!isHomePage && (
                <Link
                  to="/"
                  className="text-sm text-black/80 dark:text-white/80 hover:text-red-500 transition-colors"
                >
                  ← Back to essays
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderWrapper({ onOpenAbout }: { onOpenAbout: () => void }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return <Header isHomePage={isHomePage} onOpenAbout={onOpenAbout} />;
}

function Home() {
  return (
    <>
      <div className="py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Buffer space */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {bloggers.map((blogger, index) => (
          <BloggerCard key={index} {...blogger} />
        ))}
      </div>
    </>
  );
}

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-b from-cream to-white dark:from-[#1A1A1A] dark:to-[#121212] flex flex-col text-black dark:text-white">
          <HeaderWrapper onOpenAbout={() => setIsAboutOpen(true)} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/suggest" element={<SuggestionForm />} />
            </Routes>
          </main>
          <Footer />
          <AboutModal 
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
          />
        </div>
      </ThemeProvider>
    </Router>
  );
}