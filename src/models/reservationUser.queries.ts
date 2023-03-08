export const ReservationUserQueries = {
  GetReservationsUsers:
    'SELECT reservation.user_id "user_id", first_name, last_name, phone_number, address_line1, address_line2,  city,  province,  postal_code,  country,  profile,  reservation.id "reservation_id",  type,  date,  description  FROM reservation LEFT OUTER JOIN user ON user.id = reservation.user_id  where user.is_active=1 and is_confirmed=1;',
};
