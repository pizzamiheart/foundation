import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  serverTimestamp
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

    // Get current stats for card number
    const statsDoc = await getDoc(statsRef);
    const nextCardNumber = ((statsDoc.exists() ? statsDoc.data()?.lastCardNumber : 0) || 0) + 1;
    const paddedCardNumber = nextCardNumber.toString().padStart(5, '0');

    // Create user document with final card number
    await setDoc(userRef, {
      uid: userId,
      email,
      firstName,
      cardNumber: paddedCardNumber,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      readingList: []
    });

    // Update stats
    await updateDoc(statsRef, {
      totalUsers: increment(1),
      lastCardNumber: nextCardNumber,
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
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};