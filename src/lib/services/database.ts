import { collection, doc, getDoc, setDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import type { Essay, Author, Stats } from '../types/database';

export const incrementEssayClicks = async (essayId: string) => {
  const essayRef = doc(db, 'essays', essayId);
  const authorRef = doc(db, 'authors', (await getDoc(essayRef)).data()?.authorId);
  const statsRef = doc(db, 'stats', 'global');

  await updateDoc(essayRef, {
    clicks: increment(1)
  });

  await updateDoc(authorRef, {
    totalClicks: increment(1)
  });

  await updateDoc(statsRef, {
    totalEssayClicks: increment(1),
    lastUpdated: Date.now()
  });
};

export const addToReadingList = async (userId: string, essayId: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    readingList: arrayUnion(essayId)
  });
};

export const getStats = async (): Promise<Stats> => {
  const statsRef = doc(db, 'stats', 'global');
  const statsDoc = await getDoc(statsRef);
  return statsDoc.data() as Stats;
};

export const getAuthor = async (authorId: string): Promise<Author> => {
  const authorRef = doc(db, 'authors', authorId);
  const authorDoc = await getDoc(authorRef);
  return authorDoc.data() as Author;
};