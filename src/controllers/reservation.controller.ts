import { Request, RequestHandler, Response } from 'express';
import * as reservationService from '../services/reservation.service';
import { ReservationWithUser } from '../types/reservationUser';
import { IReservationInput, Reservation } from '../types/reservation';

// export const createReservation: RequestHandler = async (req: Request, res: Response) => {
//   try {
//     const values = [req.body.user_id, req.body.type, new Date(req.body.date), req.body.description];

//     const reservation = await reservationService.createReservation(values);
//     res.status(200).json({
//       reservation,
//     });
//   } catch (error) {
//     console.error(
//       '[reservation.controller][createReservations][Error] ',
//       typeof error === 'object' ? JSON.stringify(error) : error
//     );
//     res.status(500).json({
//       message: 'There was an error when creating Reservation',
//     });
//   }
// };

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
    const userId = req.params.id;
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


export const createReservationAdmin: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservationInputData: IReservationInput = req.body;
    console.log(reservationInputData);
    console.log(req.params);
    const values = [
      req.params.id,
      reservationInputData.type,
      new Date(reservationInputData.date),
      reservationInputData.description,
      reservationInputData.address_line1,
      reservationInputData.address_line2,
      reservationInputData.city,
      reservationInputData.province,
      reservationInputData.postal_code,
    ];

    const reservation = await reservationService.createReservation(values);
    res.status(200).json({
      reservation,
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
