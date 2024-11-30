import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';

interface EssayClick {
  authorName: string;
  essayTitle: string;
  essayUrl: string;
  timestamp: any;
}

export const trackEssayClick = async (authorName: string, essayTitle: string, essayUrl: string) => {
  try {
    const db = getDatabase();
    const clicksRef = ref(db, 'stats/essay_clicks');
    
    const clickData: EssayClick = {
      authorName,
      essayTitle,
      essayUrl,
      timestamp: serverTimestamp()
    };

    await push(clicksRef, clickData);
  } catch (error) {
    console.error('Error tracking essay click:', error);
  }
};

export const getEssayClicks = async () => {
  const db = getDatabase();
  const clicksRef = ref(db, 'stats/essay_clicks');
  
  // You can implement this later if you want to display analytics
  // For now we'll just track the clicks
};