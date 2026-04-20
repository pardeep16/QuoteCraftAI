
export type AuthResponse = {
  accessToken: string;
};

export type Quote = {
  id: number;
  topic: string;
  tone: string;
  length: number;
  prompt: string;
  result: string;
  createdAt: string;
  favorite: boolean;
  // Image-quote extension (null for plain text quotes)
  language?: string;
  quoteStyle?: string;
  imageStyle?: string;
  imageUrl?: string;
};