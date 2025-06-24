interface Azienda {
  id: string;
  nome: string;
  ticker: string;
  description: string;
  azioniPossedute?: number;
  prezzo?: number;
  isProfitable: boolean;
}
export default Azienda;