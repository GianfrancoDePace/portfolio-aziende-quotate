export interface Azienda {
  id: string;
  nome: string;
  ticker: string;
  settore: string;
  azioniPossedute?: number;
  prezzo?: number;
  isProfitable: boolean;
}
