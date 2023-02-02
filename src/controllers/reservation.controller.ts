import { Request, RequestHandler, Response } from "express";
import { createReservation, deleteReservation, getReservationById, updateReservation, getReservationByUser } from "../services/reservation.service";

export const createReservations: RequestHandler = async (req: Request, res: Response) => {
    let addressId = req.body.address_id;
    let userId = req.body.user_id;

    try {
      const values = [
        addressId,
        userId,
        req.body.type,
        req.body.date,
        req.body.description,
      ]

      const reservation = await createReservation(values);
      res.status(200).json({
        reservation,
      });
    } catch (error) {
      console.error(
        "[teams.controller][getTeams][Error] ",
        typeof error === "object" ? JSON.stringify(error) : error
      );
      res.status(500).json({
        message: "There was an error when fetching teams",
      });
    }
  };

  export const deleteReservations: RequestHandler = async (req: Request, res: Response) => {
    try {
      const reservationId = req.params.id;
      const reservation = await deleteReservation(reservationId);
      res.status(200).json({
        reservation,
      });
    } catch (error) {
      console.error(
        "[teams.controller][getTeams][Error] ",
        typeof error === "object" ? JSON.stringify(error) : error
      );
      res.status(500).json({
        message: "There was an error when fetching teams",
      });
    }
  };

export const getReservationsById: RequestHandler = async (req: Request, res: Response) => {
try {
    const reservationId = req.params.id;
    const reservation = await getReservationById(reservationId);
    res.status(200).json({
        reservation,
        });
    } catch (error) {
        console.error(
        "[teams.controller][getTeams][Error] ",
        typeof error === "object" ? JSON.stringify(error) : error
        );
        res.status(500).json({
        message: "There was an error when fetching teams",
        });
    }
    };

export const updateReservations: RequestHandler = async (req: Request, res: Response) => {
    try {
        const reservation_id = req.params.id;
        
        const values = [
            req.body.address_id,
            req.body.user_id,
            req.body.type,
            req.body.date,
            req.body.description,
        ]
        console.log(values);
        
        const reservation = await updateReservation(values, reservation_id);
        res.status(200).json({
            reservation,
            });
    } catch (error) {
        console.error(
        "[teams.controller][getTeams][Error] ",
        typeof error === "object" ? JSON.stringify(error) : error
        );
        res.status(500).json({
        message: "There was an error when fetching teams",
        });
    }
};

export const getReservationsByUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.user_id;
        const reservation = await getReservationByUser(userId);
        res.status(200).json({
            reservation,
            });
        } catch (error) {
            console.error(
            "[teams.controller][getTeams][Error] ",
            typeof error === "object" ? JSON.stringify(error) : error
            );
            res.status(500).json({
            message: "There was an error when fetching teams",
            });
        }
        };