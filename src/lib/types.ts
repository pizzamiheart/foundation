export interface LibraryStats {
    library_cards: number;
    updated_at: string;
  }
  
  export interface Essay {
    title: string;
    url: string;
  }
  
  export interface FormData {
    authorName: string;
    submitterTwitter: string;
    essays: Essay[];
  }
  
  export interface Blogger {
    name: string;
    bio: string;
    website: string;
    twitter?: string;
    essays: Essay[];
    bgColor: string;
    textColor: string;
    borderColor: string;
  }
  