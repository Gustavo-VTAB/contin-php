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
