import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '././contexts/AuthContext';
import { signOut } from '././lib/services/auth';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">{user?.email}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black rounded-md shadow-lg border border-black/20 dark:border-white/20 overflow-hidden z-50">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-sm text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}