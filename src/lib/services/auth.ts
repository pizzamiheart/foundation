import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { auth } from '../firebase';
import { createUserProfile } from './database';

export const signUp = async (email: string, password: string, firstName: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(userCredential.user.uid, email, firstName);
    return userCredential.user;
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
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password');
    }
    throw error;
  }
};

export const signOut = () => firebaseSignOut(auth);

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};