export type User = {
  id: number;
  name: string;
  phone_number: string;
  address: string;
};

export type Stuff = {
  id: number;
  name: string;
  wholesale_price: string;
  retail_price: string;
  description: string;
};

export type Agreements = {
  id: number;
  name: string;
  date: string;
  stuff_id: string;
  quantity: string;
  client_id: string;
  sign: string;
};
