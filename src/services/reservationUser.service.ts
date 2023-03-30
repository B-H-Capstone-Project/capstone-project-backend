import { execute } from '../database';
import { ReservationUserQueries } from '../models/reservationUser.queries';
import { ReservationWithUser } from '../types/reservationUser';

export const getReservationsUsers = () => {
  return execute<ReservationWithUser[]>(ReservationUserQueries.GetReservationsUsers, []);
};

export default { getReservationsUsers };
