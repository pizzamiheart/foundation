import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Library } from 'lucide-react';
import BloggerCard from './BloggerCard';
import SuggestionForm from './components/suggestion/SuggestionForm';
import LibrariansPick from './LibrariansPick';
import Footer from './Footer';
import { bloggers } from './data/bloggers';

interface HeaderProps {
  isHomePage: boolean;
}

function Header({ isHomePage }: HeaderProps) {
  return (
    <header className="bg-black border-b border-white/10 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Foundation Logo" className="w-6 h-6" />
              <h1 className="text-2xl font-medieval text-white">
                Foundation
              </h1>
            </div>
            <p className="text-sm text-white/80 italic mt-1">
              probably some of the most important writing on the internet
            </p>
          </Link>
          <div className="flex items-center gap-4">
            {isHomePage && <LibrariansPick bloggers={bloggers} />}
            <Link
              to={isHomePage ? "/suggest" : "/"}
              className="text-sm text-white/80 hover:text-red-500 transition-colors"
            >
              {isHomePage ? 'Make a suggestion →' : '← Back to essays'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return <Header isHomePage={isHomePage} />;
}

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bloggers.map((blogger, index) => (
        <BloggerCard key={index} {...blogger} />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#121212] flex flex-col">
        <HeaderWrapper />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suggest" element={<SuggestionForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}