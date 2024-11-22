import React from 'react';
import { BookOpen } from 'lucide-react';

interface Essay {
  title: string;
  url: string;
}

interface Blogger {
  name: string;
  essays: Essay[];
  [key: string]: any;
}

interface LibrariansPickProps {
  bloggers: Blogger[];
}

export default function LibrariansPick({ bloggers }: LibrariansPickProps) {
  const pickRandomEssay = () => {
    // Remove previous highlights
    document.querySelectorAll('.highlighted-card').forEach(card => {
      card.classList.remove('active');
    });
    document.querySelectorAll('.essay-link').forEach(link => {
      link.classList.remove('slide-out');
    });

    // Get random blogger and essay
    const randomBlogger = bloggers[Math.floor(Math.random() * bloggers.length)];
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
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
    >
      <BookOpen className="w-4 h-4" />
      <span>Librarian's Pick</span>
    </button>
  );
}