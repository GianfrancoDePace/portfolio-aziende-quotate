import axios from "axios";

//API per ottenere tutti i simboli relativi alle aziende del mercato americano
const API_URL = "https://finnhub.io/api/v1/stock/symbol?exchange=US";
const TOKEN = process.env.EXPO_PUBLIC_FINNHUB_API_KEY;

export interface Symbol {
  symbol: string;
  description: string;
}
export async function fetchSymbols(): Promise<Symbol[]> {
  try {
    const response = await axios.get(`${API_URL}&token=${TOKEN}`);
    return response.data.map((item: any) => ({
      symbol: item.symbol.toUpperCase(),
      description: item.description}));
  } catch (error) {
    console.error("Errore durante il fetch dei simboli:", error);
    return [];
  }
}