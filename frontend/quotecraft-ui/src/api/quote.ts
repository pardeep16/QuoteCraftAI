import { api } from "../lib/api";
import type { Quote } from "../types";


export const generateQuoteWithImage = async(data:any): Promise<Quote> => {
      const res = await api.post<Quote>('/quotes/image-generate', {
        ...data
      });

      return res.data;
}

export const generateQuote = async(data:any): Promise<Quote> => {
      const res = await api.post<Quote>('/quotes/generate', {
        ...data
      });

      return res.data;
}