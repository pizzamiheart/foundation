export interface Essay {
  title: string;
  url: string;
}

export interface Author {
  name: string;
  bio: string;
  website: string;
  twitter?: string;
  essays: Essay[];
  influence: {
    tier: 'legendary' | 'renowned' | 'emerging';
  };
}

export interface FormData {
  authorName: string;
  submitterTwitter: string;
  essays: Essay[];
}

export interface UserData {
  cardNumber: string;
  firstName: string;
  essaysBorrowed: number;
  createdAt: any; // Firebase Timestamp
  email: string;
  twitter?: string;
}

export interface SearchResult {
  essayTitle: string;
  essayUrl: string;
  authorName: string;
  relevanceScore: number;
}