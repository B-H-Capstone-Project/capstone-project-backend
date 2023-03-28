import { RowDataPacket } from 'mysql2';

export interface Reservation extends RowDataPacket {
  id: number;
  user_id: number;
  type: string;
  date: Date;
  description: string;
}
