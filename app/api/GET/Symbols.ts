import axios from "axios";
import { useEffect } from "react";

const API_URL = "https://finnhub.io/api/v1/search?q=apple&exchange=US";
const TOKEN = process.env.EXPO_PUBLIC_FINNHUB_API_KEY;

export default function QuotesData({
  onData,
}: {
  onData: (data: any) => void;
}) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}&token=${TOKEN}`);
        onData(response.data); 
        console.log(response.data);
      } catch (error) {
        onData("Errore durante il fetch dei dati: " + error);
      }
    };
    fetchData();
  }, []);

  return null;
}
