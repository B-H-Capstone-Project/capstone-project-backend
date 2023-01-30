import express from "express";
import * as resrvationController from "../controllers/reservation.controller";

const router = express.Router();

// Reservation
// Create reservation
router.post("/reservation", resrvationController.createReservations);

// Get Reservation By User Id
router.get("/reservation/user/:user_id", resrvationController.getReservationsByUsers);

// Get Reservation By Resrvation Id
router.get("/reservation/:id", resrvationController.getReservationsById);

// Update Reservation by Id
router.put("/reservation/:id", resrvationController.updateReservations);

// Delete Reservation by Id
router.delete("/reservation/:id", resrvationController.deleteReservations);



export default router;