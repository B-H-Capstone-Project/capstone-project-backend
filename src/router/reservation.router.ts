import express from 'express';
import * as reservationController from '../controllers/reservation.controller';
import * as reservationUserController from '../controllers/reservationUser.controller';

const router = express.Router();

// Reservation
// Create reservation
router.post('/reservation', reservationController.createReservations);

// Get Reservation By User Id
router.get('/reservation/user/:user_id', reservationController.getReservationsByUser);

// Get Reservation By Resrvation Id
router.get('/reservation/:id', reservationController.getReservationsById);

// Update Reservation by Id
router.put('/reservation/:id', reservationController.updateReservation);

// Delete Reservation by Id
router.delete('/reservation/:id', reservationController.deleteReservation);

// Get All Reservation (admin side)
router.get('/reservations', reservationController.getReservations);
router.get('/reservationsUsers', reservationUserController.getReservationsUsers);

// Get New / Pending Reservations - week
router.get('/newreservations', reservationController.getNewReservations);
router.get('/newpendingreservations', reservationController.getNewPendingReservations)

// Get New / Pending Reservations %
router.get('/newreservations/percentage', reservationController.getNewReservationsPercentage)
router.get('/newpendingreservations/percentage', reservationController.getNewPendingReservationsPercentage)

export default router;
