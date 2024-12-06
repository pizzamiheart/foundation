import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import BoneIcon from './BoneIcon';

interface HorizontalMenuProps {
  onOpenAbout: () => void;
}

export default function HorizontalMenu({ onOpenAbout }: HorizontalMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0"
          >
            <button
              className="p-2 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
              aria-label="Menu"
            >
              <BoneIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={false}
        animate={{
          width: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 overflow-hidden"
      >
        <button
          onClick={onOpenAbout}
          className="p-2 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
          aria-label="About Foundation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <ThemeToggle />

        <Link
          to="/suggest"
          className="p-2 text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
          aria-label="Make a suggestion"
        >
          <Pencil className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}