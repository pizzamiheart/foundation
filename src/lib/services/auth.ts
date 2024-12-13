import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { auth } from '../firebase';
import { createUserProfile } from './database';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  twitter?: string;
}

export const signUp = async ({ email, password, firstName, twitter }: SignUpData): Promise<User> => {
  try {
    // First create the auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Then create the user profile in Firestore
    try {
      await createUserProfile(userCredential.user.uid, {
        email,
        firstName,
        twitter: twitter?.replace('@', ''), // Remove @ if present
      });
      return userCredential.user;
    } catch (error) {
      console.error('Error creating user profile:', error);
      // If profile creation fails, delete the auth user to maintain consistency
      await userCredential.user.delete();
      throw new Error('Failed to create user profile');
    }
  } catch (error: any) {
    console.error('Error in signUp:', error);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already in use');
    }
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error in signIn:', error);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password');
    }
    throw error;
  }
};

export const signOut = () => firebaseSignOut(auth);

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};