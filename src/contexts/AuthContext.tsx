import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChange } from '../lib/services/auth';
import { initializeCollections } from '../lib/services/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isVerified: boolean;
  refreshVerificationStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isVerified: false,
  refreshVerificationStatus: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const refreshVerificationStatus = async () => {
    if (user) {
      await user.reload();
      setIsVerified(user.emailVerified);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        // Ensure we have the latest verification status
        await user.reload();
        setUser(user);
        setIsVerified(user.emailVerified);
        
        try {
          await initializeCollections();
        } catch (error) {
          console.error('Error initializing collections:', error);
        }
      } else {
        setUser(null);
        setIsVerified(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isVerified, refreshVerificationStatus }}>
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