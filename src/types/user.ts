import { RowDataPacket } from 'mysql2';
import { Address } from './address';
export interface User extends RowDataPacket {
  id: string;
  email: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  password: string;
  role: number;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  country: string;
}
