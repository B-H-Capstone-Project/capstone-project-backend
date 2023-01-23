import { Address } from './address';
export interface User {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: number;
    address: Address[];
    role: number;
    is_active: boolean;
}