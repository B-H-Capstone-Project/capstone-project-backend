export const ReservationUserQueries = {
  GetReservationsUsers:
    'SELECT reservation.user_id "user_id", first_name, last_name, phone_number, email, reservation.address_line1, reservation.address_line2,  reservation.city,  reservation.province,  reservation.postal_code,  reservation.country,  profile,  reservation.id "id",  type,  date,  description, is_confirmed  FROM reservation LEFT OUTER JOIN user ON user.id = reservation.user_id  where user.is_active=1;',
};
