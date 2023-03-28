export const ReservationQueries = {
  CreateReservation: 'INSERT INTO reservation (`user_id`, `type`, `date`, `description`) VALUES (?)',
  DeleteReservation: 'DELETE FROM reservation WHERE id = ?',
  GetReservationById: 'SELECT * FROM reservation WHERE id = ?',
  UpdateReservation: 'UPDATE reservation SET user_id = ?, type = ?, date = ?, description = ? WHERE id = ?',
  GetReservationByUser: 'SELECT * FROM reservation WHERE user_id = ?',
  GetReservations: 'SELECT * FROM reservation',
};
