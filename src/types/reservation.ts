export interface Reservation {
  id: number;
  user_id: number;
  address_id: string;
  type: string;
  date: Date;
  description: string;
}
