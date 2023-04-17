import { Request, RequestHandler, Response } from 'express';
import * as reservationService from '../services/reservation.service';
import { IReservationInput } from '../types/reservation';
import { createReservation } from '../services/reservation.service';
import { getUserByEmail, updateUser } from '../services/user.service';
import RowDataPacket from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';

const convertType = (type: string) => {
  switch (type) {
    case 'residential':
      return 'Residential';
    case 'commercial':
      return 'Commercial';
    case 'service':
      return 'Service';
    case 'outdoorLighting':
      return 'Outdoor Lighting';
    default:
      break;
  }
};

export const createReservations: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservationInputData: IReservationInput = req.body;

    const values = [
      req.params.id,
      convertType(reservationInputData.type),
      new Date(reservationInputData.date),
      reservationInputData.description,
      reservationInputData.address_line1,
      reservationInputData.address_line2,
      reservationInputData.city,
      reservationInputData.province,
      reservationInputData.postal_code,
      reservationInputData.country,
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
    const reservationInputData: IReservationInput = req.body;
    const reservation_id = req.params.id;

    const values = [
      reservationInputData.user_id,
      reservationInputData.type,
      new Date(reservationInputData.date),
      reservationInputData.description,
      reservationInputData.address_line1,
      reservationInputData.address_line2,
      reservationInputData.city,
      reservationInputData.province,
      reservationInputData.postal_code,
      reservationInputData.country,
    ];

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
      reservationInputData.country,
      reservationInputData.files,
    ];

    const reservation = await reservationService.createReservationAdmin(values);
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

// Get New Reservations & Pending Reservation
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

// Get % of New Reservation & Pending Reservation
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

export const getReservationAddress: RequestHandler = async (req: Request, res: Response) => {
  try {
    const addresses: any = await reservationService.getReservationAddress();

    const newAddresses = addresses.map(
      (address: any) =>
        `${address.address_line1}, ${address.city}, ${address.province} ${address.postal_code}, ${address.country}`
    );

    res.status(200).json({
      newAddresses,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][reservationAddress][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when fetching reservationAddress',
    });
  }
};

export const confirmReservation: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reservation_id = req.params.id;
    const confirmFlag = req.body.is_confirmed;

    const reservation = await reservationService.confirmReservation(confirmFlag, reservation_id);

    res.status(200).json({
      reservation,
    });
  } catch (error) {
    console.error(
      '[reservation.controller][confirmReservation][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when confirming reservation',
    });
  }
};
