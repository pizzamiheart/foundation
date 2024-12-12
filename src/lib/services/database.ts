import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  serverTimestamp,
  connectFirestoreEmulator
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
        lastCardNumber: 0,
        lastUpdated: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error initializing collections:', error);
    throw error;
  }
};

export const createUserProfile = async (userId: string, email: string, firstName: string): Promise<void> => {
  try {
    // Get references
    const userRef = doc(db, 'users', userId);
    const statsRef = doc(db, 'stats', 'global');

    // Get current stats
    const statsDoc = await getDoc(statsRef);
    if (!statsDoc.exists()) {
      await setDoc(statsRef, {
        totalUsers: 0,
        lastCardNumber: 0,
        lastUpdated: serverTimestamp()
      });
    }

    const nextCardNumber = (statsDoc.data()?.lastCardNumber || 0) + 1;
    const paddedCardNumber = nextCardNumber.toString().padStart(5, '0');

    // Create user document with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        await setDoc(userRef, {
          uid: userId,
          email,
          firstName,
          cardNumber: paddedCardNumber,
          createdAt: serverTimestamp(),
          lastActive: serverTimestamp(),
          readingList: []
        });
        break;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
      }
    }

    // Update stats
    await updateDoc(statsRef, {
      totalUsers: increment(1),
      lastCardNumber: increment(1),
      lastUpdated: serverTimestamp()
    });
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    throw new Error('Failed to create user profile');
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.error('User document does not exist');
      return null;
    }
    
    return userDoc.data();
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};