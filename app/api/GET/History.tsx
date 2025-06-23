//to be fixed

import axios from 'axios';
import { useEffect } from 'react';

const API_URL = 'https://finnhub.io/api/v1/stock/candle?symbol=';

const TOKEN = process.env.EXPO_PUBLIC_FINNHUB_API_KEY;

export default function History({ ticker, onData }: { ticker: string, onData: (data: any) => void }) {
  useEffect(() => {
    const fetchHistory = async () => {
      const now = Math.floor(Date.now() / 1000);
      const oneDay = 60 * 60 * 24;
      const from = now - oneDay * 8; // 8 giorni fa per sicurezza
      const to = now;

      try {
        const url = `${API_URL}${ticker}&resolution=D&from=${from}&to=${to}&token=${TOKEN}`;
        const response = await axios.get(url);
        onData(response.data);
      } catch (error) {
        onData(null);
      }
    };
    fetchHistory();
  }, [ticker]);

  return null;
}