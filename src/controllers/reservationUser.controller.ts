import { Request, RequestHandler, Response } from 'express';
import reservationUserService from '../services/reservationUser.service';

export const getReservationsUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationUserService.getReservationsUsers();

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
