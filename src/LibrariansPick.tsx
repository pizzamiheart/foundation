import React from 'react';
import { BookOpen } from 'lucide-react';
import type { Author } from './lib/types';

interface LibrariansPickProps {
  bloggers: Author[];
  selectedTier: Author['influence']['tier'] | 'all';
}

export default function LibrariansPick({ bloggers, selectedTier }: LibrariansPickProps) {
  const pickRandomEssay = () => {
    // Remove previous highlights
    document.querySelectorAll('.highlighted-card').forEach(card => {
      card.classList.remove('active');
    });
    document.querySelectorAll('.essay-link').forEach(link => {
      link.classList.remove('slide-out');
    });

    // Filter bloggers by selected tier
    const filteredBloggers = selectedTier === 'all' 
      ? bloggers 
      : bloggers.filter(blogger => blogger.influence.tier === selectedTier);

    // Get random blogger and essay from filtered list
    const randomBlogger = filteredBloggers[Math.floor(Math.random() * filteredBloggers.length)];
    const randomEssayIndex = Math.floor(Math.random() * randomBlogger.essays.length);
    const cardId = randomBlogger.name.toLowerCase().replace(/\s+/g, '-');

    // Scroll to the card
    const element = document.getElementById(cardId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });

      // Add highlight
      element.classList.add('highlighted-card', 'active');

      // Find the essay link element
      const essayLinks = element.querySelectorAll('.essay-link');
      const selectedEssayLink = essayLinks[randomEssayIndex] as HTMLElement;
      
      if (selectedEssayLink) {
        // Add the slide-out animation to the selected essay
        setTimeout(() => {
          selectedEssayLink.classList.add('slide-out');
        }, 500); // Wait for scroll to complete
      }
    }
  };

  return (
    <button
      onClick={pickRandomEssay}
      className="text-xs sm:text-sm flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
    >
      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
      <span>Librarian's Pick</span>
    </button>
  );
}