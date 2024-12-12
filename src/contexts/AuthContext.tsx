import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthChange } from '../lib/services/auth';
import { initializeCollections } from '../lib/services/database';
import { initializeFirebase } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      // Initialize Firebase first
      await initializeFirebase();
      
      const unsubscribe = onAuthChange(async (user) => {
        setUser(user);
        
        if (user) {
          try {
            await initializeCollections();
          } catch (error) {
            console.error('Error initializing collections:', error);
          }
        }
        
        setLoading(false);
      });

      return () => unsubscribe();
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}