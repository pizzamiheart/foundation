// Collection: users
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: number;
  readingList: string[]; // Array of essay IDs
}

// Collection: essays
export interface Essay {
  id: string;
  authorId: string;
  title: string;
  url: string;
  clicks: number;
  createdAt: number;
}

// Collection: authors
export interface Author {
  id: string;
  name: string;
  bio: string;
  website: string;
  twitter?: string;
  essayCount: number;
  totalClicks: number;
}

// Collection: stats
export interface Stats {
  totalEssayClicks: number;
  totalUsers: number;
  lastUpdated: number;
}