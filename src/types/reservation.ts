import { User } from './user'
import { Address } from './address'
export interface Reservation {
    id: string;
    user: User;
    address: Address[];
    type: string;
    date: Date;
    desc: string;
}