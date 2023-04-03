export const ReservationQueries = {
  CreateReservation: 'INSERT INTO reservation (`user_id`, `type`, `date`, `description`) VALUES (?)',
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
};
