import { initializeApp } from '@firebase/app';
import { getDatabase, ref, increment, get, set, onValue, Database, DataSnapshot } from '@firebase/database';
import { getAnalytics } from '@firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db: Database = getDatabase(app);

// Initialize the library cards count if it doesn't exist
const initializeLibraryCards = async () => {
  const statsRef = ref(db, 'stats/library_cards');
  try {
    const snapshot: DataSnapshot = await get(statsRef);
    if (!snapshot.exists()) {
      await set(statsRef, 0);
      console.log('Library cards counter initialized');
    }
  } catch (error: unknown) {
    console.error('Error initializing library cards:', error);
  }
};

// Call initialization
initializeLibraryCards();

export async function incrementLibraryCards(): Promise<number> {
  try {
    const statsRef = ref(db, 'stats/library_cards');
    await set(statsRef, increment(1));
    const snapshot: DataSnapshot = await get(statsRef);
    return snapshot.val() || 0;
  } catch (error: unknown) {
    console.error('Error incrementing library cards:', error);
    return 0;
  }
}

export function subscribeToLibraryCards(callback: (count: number) => void): () => void {
  const statsRef = ref(db, 'stats/library_cards');
  const unsubscribe = onValue(statsRef, (snapshot: DataSnapshot) => {
    callback(snapshot.val() || 0);
  }, (error: Error) => {
    console.error('Error subscribing to library cards:', error);
    callback(0);
  });
  
  return unsubscribe;
}
