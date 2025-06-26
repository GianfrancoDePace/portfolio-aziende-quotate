import axios from 'axios';
import { useEffect } from 'react';
//prende i dati di tutte le chiusure da aplha venture
const API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
const TOKEN = process.env.EXPO_PUBLIC_ALPHA_VENTURE_API_KEY;
const date = new Date()

export default function HistoricalData({ ticker, onData }: { ticker: string, onData: (data: any) => void }) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}${ticker}&outputsize=full&apikey=${TOKEN}`);
                console.log(response.data); 
                onData(response.data);
            } catch (error) {
                onData("Errore durante il fetch dei dati: " + error);
            }
        };
        fetchData();
        console.log(fetchData);
    }, [ticker]);
    return null;
}
