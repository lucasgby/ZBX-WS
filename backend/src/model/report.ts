export interface Occurrence {
  description: string;
  number: number;
}

export interface Trigger {
  tipo: string;
  quantidade: number;
  hosts: {
    name: string;
    date: string;
  }[];
}[];