import { api } from "../lib/api";
import type { Quote } from "../types";


export const generateQuoteWithImage = async(data:any): Promise<Quote> => {
    const token = localStorage.getItem('quotecraft_access_token');
      const res = await api.post<Quote>('/quotes/image-generate', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data
      });

      return res.data;
}

export const generateQuote = async(data:any): Promise<Quote> => {
    const token = localStorage.getItem('quotecraft_access_token');
      const res = await api.post<Quote>('/quotes/generate', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data
      });

      return res.data;
}