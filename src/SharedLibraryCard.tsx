import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase';
import LibraryCard from './LibraryCard';

interface UserData {
  cardNumber: string;
  firstName: string;
  essaysBorrowed: number;
  createdAt: any;
}

export default function SharedLibraryCard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', userId),
      (doc) => {
        if (doc.exists()) {
          setUserData(doc.data() as UserData);
          setError(null);
        } else {
          setError('Library card not found');
          setUserData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching user data:', err);
        setError('Error loading library card');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const handleGetCard = () => {
    window.open('/signup', '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-black/60 dark:text-white/60">Loading...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medieval text-black dark:text-white mb-4">
          {error || 'Library Card Not Found'}
        </h2>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors"
        >
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-12 md:pt-24 px-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medieval text-black dark:text-white text-center mb-8">
            {userData.firstName}'s Library Card
          </h2>
          <button
            onClick={handleGetCard}
            className="px-6 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border-2 border-yellow-500/50 dark:border-yellow-500/70 rounded-md text-black dark:text-white transition-all duration-300 hover:border-yellow-500"
          >
            Get Your Own Library Card
          </button>
        </div>
        <div className="w-full max-w-md md:max-w-2xl mx-auto">
          <LibraryCard readonly userData={userData} />
        </div>
      </div>
    </div>
  );
}