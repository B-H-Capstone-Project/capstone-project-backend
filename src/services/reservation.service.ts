import { ReservationQueries } from "../models/reservation.queries";
import { execute } from "../database";
import { Reservation } from "../types/reservation";

export const createReservation = (values:any) => {
    return execute<Reservation>(ReservationQueries.CreateReservation, [values]);
  };

  export const deleteReservation = (reservationId:any) => {
    return execute(ReservationQueries.DeleteReservation, reservationId);
  }

  export const getReservationById = (reservationId:any) => {
    return execute(ReservationQueries.GetReservationById, [reservationId]);
  }

  export const updateReservation = (values:any, reservationId:any) => {
    return execute(ReservationQueries.UpdateReservation, [...values, reservationId]);
  }

  export const getReservationByUser = (userId:any) => {
    return execute(ReservationQueries.GetReservationByUser, userId);
  }

  export default { getReservationById, deleteReservation, createReservation, updateReservation, getReservationByUser};