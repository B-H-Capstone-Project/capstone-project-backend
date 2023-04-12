import { ReservationQueries } from '../models/reservation.queries';
import { execute } from '../database';
import { Reservation } from '../types/reservation';

export const createReservation = (values: any) => {
  return execute<Reservation>(ReservationQueries.CreateReservation, [values]);
};

export const deleteReservation = (reservationId: any) => {
  return execute(ReservationQueries.DeleteReservation, reservationId);
};

export const getReservationById = (reservationId: any) => {
  return execute(ReservationQueries.GetReservationById, [reservationId]);
};

export const updateReservation = (values: any, reservationId: any) => {
  return execute(ReservationQueries.UpdateReservation, [...values, reservationId]);
};

export const getReservationByUser = (userId: any) => {
  return execute(ReservationQueries.GetReservationByUser, userId);
};

export const getReservations = () => {
  return execute(ReservationQueries.GetReservations, []);
};

// Get New Reservations
export const getNewReservation = () => {
  return execute<Reservation[]>(ReservationQueries.GetNewReservations, []);
};
export const getNewPendingReservation = () => {
  return execute<Reservation[]>(ReservationQueries.GetNewPendingReservations, []);
};

// Get New Reservations %
export const getNewReservationPercentage = () => {
  return execute<Reservation[]>(ReservationQueries.GetNewReservationsPercentage, []);
};
export const getNewPendingReservationPercentage = () => {
  return execute<Reservation[]>(ReservationQueries.GetNewPendingReservationsPercentage, []);
};

// Get Only Reservation Address
export const getReservationAddress = () => {
  return execute(ReservationQueries.GetReservationAddress, []);
};

// Confirm Reservation
export const confirmReservation = (confirmFlag: any, reservationId: any) => {
  return execute(ReservationQueries.UpdateReservationStatus, [confirmFlag, reservationId]);
};

export default {
  getReservationById,
  deleteReservation,
  createReservation,
  updateReservation,
  getReservationByUser,
  getReservations,
  getNewReservation,
  getNewPendingReservation,
  getNewReservationPercentage,
  getNewPendingReservationPercentage,
  getReservationAddress,
  confirmReservation,
};
