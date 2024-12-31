import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  writeBatch,
  serverTimestamp,
  onSnapshot,
  runTransaction
} from 'firebase/firestore';
import { db } from '../firebase';

interface UserProfileData {
  email: string;
  firstName: string;
  twitter?: string;
}

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
    // Don't throw here - we want the app to continue even if initialization fails
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

export const createUserProfile = async (userId: string, profileData: UserProfileData): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    const statsRef = doc(db, 'stats', 'global');
    const batch = writeBatch(db);

    // First check if user document already exists
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      console.log('User document already exists');
      return;
    }

    const statsDoc = await getDoc(statsRef);
    const nextCardNumber = ((statsDoc.exists() ? statsDoc.data()?.lastCardNumber : 0) || 0) + 1;
    const paddedCardNumber = nextCardNumber.toString().padStart(5, '0');

    // Remove undefined fields from profileData
    const cleanProfileData: Record<string, any> = { ...profileData };
    Object.keys(cleanProfileData).forEach((key) => {
      if (cleanProfileData[key] === undefined) {
        delete cleanProfileData[key];
      }
    });

    // Set user document
    batch.set(userRef, {
      uid: userId,
      ...cleanProfileData,
      cardNumber: paddedCardNumber,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      readingList: [],
      essaysBorrowed: 0,
    });

    // Update stats document
    if (!statsDoc.exists()) {
      batch.set(statsRef, {
        totalUsers: 1,
        totalEssayClicks: 0,
        lastCardNumber: nextCardNumber,
        lastUpdated: serverTimestamp(),
      });
    } else {
      batch.update(statsRef, {
        totalUsers: increment(1),
        lastCardNumber: increment(1),
        lastUpdated: serverTimestamp(),
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

export const incrementEssaysBorrowed = async (userId: string): Promise<void> => {
  try {
    // Use a transaction to ensure both updates succeed or fail together
    await runTransaction(db, async (transaction) => {
      const userRef = doc(db, 'users', userId);
      const statsRef = doc(db, 'stats', 'global');
      
      // Get current documents
      const userDoc = await transaction.get(userRef);
      const statsDoc = await transaction.get(statsRef);
      
      if (!userDoc.exists()) {
        throw new Error('User document not found');
      }

      // Update user document
      transaction.update(userRef, {
        essaysBorrowed: increment(1),
        lastActive: serverTimestamp()
      });

      // Update global stats
      if (!statsDoc.exists()) {
        transaction.set(statsRef, {
          totalEssayClicks: 1,
          lastUpdated: serverTimestamp()
        });
      } else {
        transaction.update(statsRef, {
          totalEssayClicks: increment(1),
          lastUpdated: serverTimestamp()
        });
      }
    });
  } catch (error) {
    console.error('Error incrementing essays borrowed:', error);
    throw new Error('Failed to update essays borrowed count');
  }
};

export const subscribeToUserProfile = (
  userId: string, 
  callback: (data: any) => void
): () => void => {
  const userRef = doc(db, 'users', userId);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  });
};
