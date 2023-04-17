import { Request, RequestHandler, Response } from 'express';
import * as reservationService from '../services/reservation.service';
import { IReservationInput } from '../types/reservation';
import { createReservation } from '../services/reservation.service';
import { getUserByEmail, updateUser } from '../services/user.service';
import RowDataPacket from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';

export const createReservations: RequestHandler = async (req: Request, res: Response) => {
  try {
    const email = req.body.data.user.email;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var phoneNum = req.body.phone_number;
    var add1 = req.body.address_line1;
    var add2 = req.body.address_line2;
    var postalCode = req.body.postal_code;
    var prov = req.body.province;
    var city = req.body.city;
    var country = req.body.country;
    if (firstName == null) {
      firstName = req.body.data.user.first_name;
    }
    if (lastName == null) {
      lastName = req.body.data.user.last_name;
    }
    if (phoneNum == null) {
      phoneNum = req.body.data.user.phone_number;
    }
    if (add1 == null) {
      add1 = req.body.data.user.address_line1;
    }
    if (add2 == null) {
      add2 = req.body.data.user.address_line2;
    }
    if (city == null) {
      city = req.body.data.user.city;
    }
    if (prov == null) {
      prov = req.body.data.user.province;
    }
    if (country == null) {
      country = req.body.data.user.country;
    }
    if (postalCode == null) {
      postalCode = req.body.data.user.postal_code;
    }
    const userServer = <RowDataPacket>(await getUserByEmail(email))[0];

    if (!userServer) {
      return res.status(401).json({ message: 'There is no account with that email' });
    }

    const userValues = [
      userServer.password,
      firstName,
      lastName,
      phoneNum,
      add1,
      add2,
      city,
      prov,
      postalCode,
      country,
    ];
    await updateUser(userValues, userServer.id);

    const resValues = [userServer.id, req.body.type, new Date(req.body.date), req.body.description];

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