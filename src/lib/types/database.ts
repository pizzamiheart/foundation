import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';

let isInitialized = false;

export const initializeCollections = async (): Promise<void> => {
  if (isInitialized) return;

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
    isInitialized = true;
  } catch (error) {
    console.error('Error initializing collections:', error);
    throw error;
  }
};

export const createUserProfile = async (userId: string, email: string, firstName: string): Promise<void> => {
  // Ensure collections are initialized first
  if (!isInitialized) {
    await initializeCollections();
  }

  try {
    // Get references
    const userRef = doc(db, 'users', userId);
    const statsRef = doc(db, 'stats', 'global');

    // Create initial user document
    await setDoc(userRef, {
      uid: userId,
      email,
      firstName,
      cardNumber: '00000', // Temporary number
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      readingList: []
    });

    // Get current stats and update card number
    const statsDoc = await getDoc(statsRef);
    const nextCardNumber = ((statsDoc.exists() ? statsDoc.data().lastCardNumber : 0) || 0) + 1;
    const paddedCardNumber = nextCardNumber.toString().padStart(5, '0');

    // Update user with correct card number
    await updateDoc(userRef, {
      cardNumber: paddedCardNumber
    });

    // Update stats
    await updateDoc(statsRef, {
      totalUsers: increment(1),
      lastCardNumber: increment(1),
      lastUpdated: serverTimestamp()
    });

    // Verify the user document was created
    const verifyDoc = await getDoc(userRef);
    if (!verifyDoc.exists()) {
      throw new Error('User document was not created successfully');
    }

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