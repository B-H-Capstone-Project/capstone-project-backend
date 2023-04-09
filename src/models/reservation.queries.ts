export const ReservationQueries = {
  CreateReservation: 'INSERT INTO reservation (`user_id`, `type`, `date`, `description`, `address_line1`, `address_line2`, `city`, `province`, `postal_code`) VALUES (?)',
  DeleteReservation: 'DELETE FROM reservation WHERE id = ?',
  GetReservationById: 'SELECT * FROM reservation WHERE id = ?',
  UpdateReservation: 'UPDATE reservation SET user_id = ?, type = ?, date = ?, description = ? WHERE id = ?',
  GetReservationByUser: 'SELECT * FROM reservation WHERE user_id = ?',
  GetReservations: 'SELECT * FROM reservation',

  // Get New / Pending Reservation data (week)
  GetNewReservations: 'SELECT * FROM reservation WHERE created_date >= DATE_SUB(NOW(), INTERVAL 1 WEEK);',
  GetNewPendingReservations: 'SELECT * FROM reservation WHERE created_date >= DATE_SUB(NOW(), INTERVAL 1 WEEK) AND is_confirmed = 1;',

  // Get Percentage (current week - last week)
  GetNewReservationsPercentage: `SELECT CONCAT(ROUND(((COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) THEN 1 ELSE NULL END) - COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) - 1 THEN 1 ELSE NULL END)) / COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) - 1 THEN 1 ELSE NULL END)) * 100), '%') AS increase_percentage FROM reservation WHERE WEEK(created_date) >= WEEK(NOW()) - 1;`,
  GetNewPendingReservationsPercentage: `SELECT CONCAT(ROUND(((COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) THEN 1 ELSE NULL END) - COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) - 1 THEN 1 ELSE NULL END)) / COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) - 1 THEN 1 ELSE NULL END)) * 100), '%') AS increase_percentage FROM reservation WHERE WEEK(created_date) >= WEEK(NOW()) - 1 AND is_confirmed = 1;`,

  // Get Only Reservation Address
  GetReservationAddress: `SELECT address_line1, city, province, postal_code, country FROM reservation;`,

  // Get Reservation's data for Google map
  GetReservationMap: `SELECT reservation.id, reservation.type, reservation.date, reservation.description, reservation.address_line1, reservation.city, reservation.province, reservation.postal_code, reservation.country, user.first_name, user.last_name
  FROM reservation
  JOIN user
  ON reservation.user_id = user.id
  WHERE is_confirmed = 2;`
};
