export interface Azienda {
  id: string;
  nome: string;
  ticker: string;
  sector: string;
  azioniPossedute?: number;
  prezzo?: number;
  isProfitable: boolean;
}
