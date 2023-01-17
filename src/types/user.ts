import { Address } from './address';
export interface User {
    email: string;
    is_active: boolean;
    first_name: string;
    last_name: string;
    phone_number: number;
    address: Address[];
    password: string;
    role: number;
}