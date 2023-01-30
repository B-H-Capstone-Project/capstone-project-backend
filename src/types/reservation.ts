export interface Reservation {
    id: string;
    user_id: number;
    address_id: string;
    type: string;
    date: Date;
    desc: string;
}