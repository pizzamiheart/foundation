import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BloggerCard from './BloggerCard';
import SuggestionForm from './components/suggestion/SuggestionForm';
import LibrariansPick from './LibrariansPick';
import LibraryStats from './LibraryStats';
import Footer from './Footer';
import AboutModal from './AboutModal';
import HorizontalMenu from './HorizontalMenu';
import { ThemeProvider } from './contexts/ThemeContext';
import { bloggers } from './data/bloggers';

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <Router>
      <ThemeProvider>
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
                      probably some of the most important writing on the internet
                    </p>
                  </Link>
                  <div className="flex items-center justify-center w-full sm:w-auto gap-2 sm:gap-4">
                    <HorizontalMenu onOpenAbout={() => setIsAboutOpen(true)} />
                    <LibrariansPick bloggers={bloggers} />
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
                    {bloggers.map((blogger, index) => (
                      <BloggerCard key={index} {...blogger} />
                    ))}
                  </div>
                </>
              } />
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

export default App;