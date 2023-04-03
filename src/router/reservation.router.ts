import express from 'express';
import { body } from 'express-validator';
import * as reservationController from '../controllers/reservation.controller';
import * as reservationUserController from '../controllers/reservationUser.controller';

const router = express.Router();

const reservationValidateCredential = [
    body('type').notEmpty(),
  ]
// Reservation
// Create reservation
router.post('/reservation/:id', reservationController.createReservationAdmin);
router.post('/reservation/newreservation', reservationValidateCredential, reservationController.createReservations);

// Get Reservation By User Id
router.get('/reservation/user/:id', reservationController.getReservationsByUser);

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
