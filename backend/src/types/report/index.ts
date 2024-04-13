interface Occurrence {
  description: string;
  number: number;
}

interface Trigger {
  tipo: string;
  quantidade: number;
  hosts: {
    name: string;
    date: string;
    triggerid: string
  }[];
}[];

export {
  Occurrence,
  Trigger
}