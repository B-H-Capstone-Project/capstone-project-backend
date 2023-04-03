import { Request, RequestHandler, Response } from 'express';
import * as reservationService from '../services/reservation.service';
import { createReservation } from '../services/reservation.service';
import { getUserByEmail, updateUser } from '../services/user.service';
import RowDataPacket from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';

export const createReservations: RequestHandler = async (req: Request, res: Response) => {
  try {
    // console.log("req.body: " + JSON.stringify(req.body));
    const email = req.body.email;
    // console.log("email: " + email);

    const userServer = <RowDataPacket>(await getUserByEmail(email))[0];

    // console.log("userServer: " + JSON.stringify(userServer));

    if (!userServer) {
      return res.status(401).json({ message: 'There is no account with that email' });
    }

    const userValues = [
      userServer.password,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.address_line1,
      req.body.address_line2,
      req.body.city,
      req.body.province,
      req.body.postal_code,
      req.body.country,
    ]

    await updateUser(userValues, userServer.id);

    const resValues = [
      userServer.id,
      req.body.type,
      req.body.date,
      req.body.description,
    ]

    await createReservation(resValues);

    res.status(200).json({
      message: 'Reservation Created',
    });
  } catch (error) {
    console.error(
      '[reservation.controller][createReservations][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when creating Reservation',
    });
  }
};

export const deleteReservation: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const reservation = await reservationService.deleteReservation(reservationId);
    res.status(200).json({
      reservation,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][deleteReservation][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when deleting reservation',
    });
  }
};

export const getReservationsById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const reservation = await reservationService.getReservationById(reservationId);
    res.status(200).json({
      reservation,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][getReservationsById][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when get reservations by id',
    });
  }
};

export const updateReservation: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservation_id = req.params.id;

    const values = [req.body.user_id, req.body.type, req.body.date, req.body.description];
    console.log(req.body);

    const reservation = await reservationService.updateReservation(values, reservation_id);
    res.status(200).json({
      reservation,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][updateReservation][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when updatig reservation',
    });
  }
};

export const getReservationsByUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const reservation = await reservationService.getReservationByUser(userId);
    res.status(200).json({
      reservation,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][getReservationsByUsers][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when get reservations by user',
    });
  }
};

export const getReservations: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getReservations();

    res.status(200).json({
      reservations,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][getReservations][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when fetching reservations',
    });
  }
};

// Get New Reservations
export const getNewReservations: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getNewReservation();
    res.status(200).json({
      reservations,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][getNewReservations][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when get new reservations',
    });
  }
};

export const getNewPendingReservations: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getNewPendingReservation();
    res.status(200).json({
      reservations,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][getNewPendingReservations][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when get new pending reservations',
    });
  }
};

export const getNewReservationsPercentage: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getNewReservationPercentage();
    const reservationPercentage = reservations[0].increase_percentage;
    res.status(200).json({
      reservationPercentage,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][getNewReservations %][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when get % of new reservations',
    });
  }
};

  export const getNewPendingReservationsPercentage: RequestHandler = async (req: Request, res: Response) => {
    try {
      const reservations = await reservationService.getNewPendingReservationPercentage();
      const reservationPercentage = reservations[0].increase_percentage;
      res.status(200).json({
        reservationPercentage,
      });
    } catch (error) {
      console.error(
        '[reservation.controller][getNewReservations %][Error] ',
        typeof error === 'object' ? JSON.stringify(error) : error
      );
      res.status(500).json({
        message: 'There was an error when get % of new pending reservations',
      });
    }
  };

