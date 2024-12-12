import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
import { isSupported } from 'firebase/analytics';
import { app } from '../firebase';

// Initialize analytics with proper typing
let analytics: Analytics | undefined;

// Only initialize in production and if supported
if (import.meta.env.PROD) {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  } else {
    console.warn('Firebase Analytics is not initialized');
  }
};

export const trackEssayClick = (essayTitle: string, authorName: string): void => {
  trackEvent('essay_click', {
    essay_title: essayTitle,
    author_name: authorName,
    timestamp: Date.now(),
  });
};

export const trackLibraryCardSignup = (): void => {
  trackEvent('library_card_signup', {
    timestamp: Date.now(),
  });
};

export const trackSuggestionSubmit = (authorName: string): void => {
  trackEvent('suggestion_submit', {
    author_name: authorName,
    timestamp: Date.now(),
  });
};