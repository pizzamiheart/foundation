import { initializeApp } from '@firebase/app';
import { getDatabase, ref, increment, get, set, onValue, Database, DataSnapshot } from '@firebase/database';
import { getAnalytics } from '@firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCGr3CPtaLc1WtkDbGCNxBO-LKO51hduuw",
  authDomain: "foundation-c0e8b.firebaseapp.com",
  databaseURL: "https://foundation-c0e8b-default-rtdb.firebaseio.com",
  projectId: "foundation-c0e8b",
  storageBucket: "foundation-c0e8b.appspot.com",
  messagingSenderId: "908024914529",
  appId: "1:908024914529:web:e9f154c40388dca17dc020",
  measurementId: "G-RND9F7NY5C"
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
