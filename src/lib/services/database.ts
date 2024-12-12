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

    // Start a batch write
    const batch = writeBatch(db);

    // Get current stats first
    const statsDoc = await getDoc(statsRef);
    const nextCardNumber = ((statsDoc.exists() ? statsDoc.data().lastCardNumber : 0) || 0) + 1;
    const paddedCardNumber = nextCardNumber.toString().padStart(5, '0');

    // Add user document to batch
    batch.set(userRef, {
      uid: userId,
      email,
      firstName,
      cardNumber: paddedCardNumber,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      readingList: []
    });

    // Update stats in batch
    if (!statsDoc.exists()) {
      batch.set(statsRef, {
        totalUsers: 1,
        lastCardNumber: nextCardNumber,
        lastUpdated: serverTimestamp()
      });
    } else {
      batch.update(statsRef, {
        totalUsers: increment(1),
        lastCardNumber: increment(1),
        lastUpdated: serverTimestamp()
      });
    }

    // Commit the batch
    await batch.commit();

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