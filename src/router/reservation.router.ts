import express from 'express';
import * as reservationController from '../controllers/reservation.controller';

const router = express.Router();

// Reservation
// Create reservation
router.post('/reservation', reservationController.createReservations);

// Get Reservation By User Id
router.get('/reservation/user/:user_id', reservationController.getReservationsByUsers);

// Get Reservation By Resrvation Id
router.get('/reservation/:id', reservationController.getReservationsById);

// Update Reservation by Id
router.put('/reservation/:id', reservationController.updateReservations);

// Delete Reservation by Id
router.delete('/reservation/:id', reservationController.deleteReservations);

// Get All Reservation (admin side)
router.get('/reservations', reservationController.getReservations);

export default router;
