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

export const initializeCollections = async (): Promise<void> => {
  const statsRef = doc(db, 'stats', 'global');

  try {
    const statsDoc = await getDoc(statsRef);
    if (!statsDoc.exists()) {
      await setDoc(statsRef, {
        totalUsers: 0,
        totalEssayClicks: 0,
        lastCardNumber: 0,
        lastUpdated: Timestamp.now()
      });
    }
  } catch (error) {
    console.error('Error initializing collections:', error);
    throw error;
  }
};

export const createUserProfile = async (userId: string, email: string, firstName: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const statsRef = doc(db, 'stats', 'global');

  try {
    // Check if user profile already exists
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return;
    }

    // Get and increment card number
    const statsDoc = await getDoc(statsRef);
    const nextCardNumber = (statsDoc.data()?.lastCardNumber || 0) + 1;
    const paddedCardNumber = nextCardNumber.toString().padStart(5, '0');

    // Create user document
    await setDoc(userRef, {
      uid: userId,
      email,
      firstName,
      cardNumber: paddedCardNumber,
      createdAt: Timestamp.now(),
      lastActive: Timestamp.now(),
      readingList: []
    });

    // Update global stats
    await updateDoc(statsRef, {
      totalUsers: increment(1),
      lastCardNumber: increment(1),
      lastUpdated: Timestamp.now()
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
};