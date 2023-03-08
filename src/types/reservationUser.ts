import { RowDataPacket } from 'mysql2';
export interface ReservationWithUser extends RowDataPacket {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  profile: string;
  reservation_id: number;
  type: string;
  date: Date;
  description: string;
  is_confirmed: boolean;
}
