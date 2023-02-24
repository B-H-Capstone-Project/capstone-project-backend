import { RowDataPacket } from 'mysql2';
import { Address } from './address';
export interface User extends RowDataPacket {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  address_id: Address[];
  role: number;
  is_active: boolean;
}
