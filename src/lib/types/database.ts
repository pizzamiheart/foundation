import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  arrayUnion,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// Initialize collections if they don't exist
export const initializeCollections = async (): Promise<void> => {
  const statsRef = doc(db, 'stats', 'global');

  try {
    const statsDoc = await getDoc(statsRef);
    if (!statsDoc.exists()) {
      await setDoc(statsRef, {
        totalUsers: 0,
        totalEssayClicks: 0,
        lastUpdated: Timestamp.now()
      });
      console.log('Global stats initialized');
    }
  } catch (error) {
    console.error('Error initializing collections:', error);
    throw error;
  }
};

// Create a new user profile
export const createUserProfile = async (userId: string, email: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const statsRef = doc(db, 'stats', 'global');

  try {
    // Check if user profile already exists
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      console.log('User profile already exists:', userId);
      return;
    }

    // Create user document
    await setDoc(userRef, {
      uid: userId,
      email,
      createdAt: Timestamp.now(),
      lastActive: Timestamp.now(),
      readingList: []
    });

    // Update global stats
    await updateDoc(statsRef, {
      totalUsers: increment(1),
      lastUpdated: Timestamp.now()
    });

    console.log('User profile created successfully:', userId);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};