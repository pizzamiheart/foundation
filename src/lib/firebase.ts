import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.vite_firebase_api_key,
  authDomain: import.meta.env.vite_firebase_auth_domain,
  projectId: import.meta.env.vite_firebase_project_id,
  storageBucket: import.meta.env.vite_firebase_storage_bucket,
  messagingSenderId: import.meta.env.vite_firebase_messaging_sender_id,
  appId: import.meta.env.vite_firebase_app_id,
  measurementId: import.meta.env.vite_firebase_measurement_id
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });

// Initialize Firebase services
export const initializeFirebase = async () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      unsubscribe();
      resolve(true);
    });
  });
};