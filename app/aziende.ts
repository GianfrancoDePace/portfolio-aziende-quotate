export type Azienda = {
  id: string;
  nome: string;
  description: string;
  utili?: number;
  isProfitable: boolean;
};

export const aziendeIniziali = [
  { id: '1', nome: 'Apple', description: 'Azienda tecnologica', utili: 1000, isProfitable: true },
  { id: '2', nome: 'Microsoft', description: 'Azienda di software', utili: 2000, isProfitable: true },
  { id: '3', nome: 'Google', description: 'Azienda di ricerca e pubblicità', utili: -3000, isProfitable: true },
  { id: '4', nome: 'Amazon', description: 'Azienda di e-commerce', utili: 4000, isProfitable: true },
  { id: '5', nome: 'Tesla', description: 'Azienda automobilistica elettrica', utili: 5000, isProfitable: true },
  { id: '6', nome: 'Facebook', description: 'Azienda di social media', utili: -6000, isProfitable: true },
  { id: '7', nome: 'Netflix', description: 'Azienda di streaming video', utili: 7000, isProfitable: true },
  { id: '8', nome: 'Samsung', description: 'Azienda di elettronica', utili: 8000, isProfitable: true },
  { id: '9', nome: 'Sony', description: 'Azienda di elettronica e intrattenimento', utili: 9000, isProfitable: true },
];
