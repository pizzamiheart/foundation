export interface Essay {
    title: string;
    url: string;
  }
  
  export interface FormData {
    authorName: string;
    submitterTwitter: string;
    essays: Essay[];
  }