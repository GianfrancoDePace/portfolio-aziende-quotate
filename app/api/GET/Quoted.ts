import axios from 'axios';
import { useEffect } from 'react';

const API_URL = 'https://finnhub.io/api/v1/quote?symbol=';
const TOKEN = process.env.EXPO_PUBLIC_FINNHUB_API_KEY; 

export default function Quoted({ ticker, onData }: { ticker: string, onData: (data: any) => void }) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}${ticker}&token=${TOKEN}`);
                onData(response.data);
            } catch (error) {
                onData("Errore durante il fetch dei dati: " + error);
            }
        };
        fetchData();
    }, [ticker]);

    return null; 
}


