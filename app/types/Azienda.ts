export interface Azienda {
  id: string;
  nome: string;
  ticker: string;
  description: string;
  azioniPossedute?: number;
  prezzo?: number;
  utili?: number;
  isProfitable: boolean;
}