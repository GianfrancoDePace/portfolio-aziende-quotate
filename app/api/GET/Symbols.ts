import axios from "axios";

const API_URL = "https://finnhub.io/api/v1/stock/symbol?exchange=US";
const TOKEN = process.env.EXPO_PUBLIC_FINNHUB_API_KEY;

export interface UsSymbol {
  symbol: string;
  description: string;
}
export async function fetchUsSymbols(): Promise<UsSymbol[]> {
  try {
    const response = await axios.get(`${API_URL}&token=${TOKEN}`);
    // La risposta è un array di oggetti con proprietà "symbol"
    return response.data.map((item: any) => ({
      symbol: item.symbol.toUpperCase(),
      description: item.description}));
  } catch (error) {
    console.error("Errore durante il fetch dei simboli:", error);
    return [];
  }
}