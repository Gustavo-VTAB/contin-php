export interface Phone {
  id: number;
  name: string;
  number: string;
  operator: string;
  card_id: number | null;
  card_name?: string;
  status: string;
  easy_at: string;
}

interface Card {
  id: number;
  name: string;
  number: string;
  validity: string;
  cvv: string;
  limit: string;
  status: string;
  obs: string;
}

interface Profile {
  id: number;
  name: string;
  manager_id: number | null;
  manager_name?: string;
  phone_id: number | null;
  phone_number?: string;
  status: string;
  obs: string;
}


interface BM {
  id: number;
  name: string;
  status: string;
  obs: string;
}

interface Page {
  id: number;
  name: string;
  ig_login: string;
  ig_email: string;
  ig_password: string;
  status: string;
  obs: string;
}
