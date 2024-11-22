import React from 'react';
import { Library } from 'lucide-react';
import BloggerCard from './components/BloggerCard';
import SuggestionForm from './components/SuggestionForm';
import LibrariansPick from './components/LibrariansPick';
import { bloggers } from './data/bloggers';

export default function App() {
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#121212]">
      <header className="bg-black border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Foundation Logo" className="w-6 h-6" />
                <h1 className="text-2xl font-medieval text-white">
                  Foundation
                </h1>
              </div>
              <p className="text-sm text-white/80 italic mt-1">
                aggregating essays and blogs in ideas + tech
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LibrariansPick bloggers={bloggers} />
              <button
                onClick={() => setShowForm(!showForm)}
                className="text-sm text-white/80 hover:text-red-500 transition-colors"
              >
                {showForm ? '← Back to essays' : 'Make a suggestion →'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <SuggestionForm onClose={() => setShowForm(false)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloggers.map((blogger, index) => (
              <BloggerCard key={index} {...blogger} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-black border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-white/80 text-sm">
            probably some of the most important writing on the internet
            <br />
            <span className="text-xs opacity-75">made by <a href="https://x.com/pizzamiheart" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 hover:underline transition-colors">@pizzamiheart</a></span>
          </p>
        </div>
      </footer>
    </div>
  );
}