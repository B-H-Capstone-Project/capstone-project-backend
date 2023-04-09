import { RowDataPacket } from 'mysql2';

export interface Reservation extends RowDataPacket {
  id: number;
  user_id: number;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  province: string;
  country: string;
  city: string;
  type: string;
  date: string;
  description: string;
  is_confirmed: boolean;
  created_date: Date;
}

export interface IReservationInput {
  user_id: number;
  type: string;
  date: string;
  description: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  province: string;
  country: string;
  city: string;
}
