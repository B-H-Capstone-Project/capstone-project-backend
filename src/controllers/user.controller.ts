import { Request, RequestHandler, Response } from 'express';
import userService, {
  getUser,
  getUserById,
  getUserEmployee,
  getUserCustomer,
  deleteUser,
  updateUser,
  getNewEmployee,
  getNewCustomer,
} from '../services/user.service';
import RowDataPacket from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';
import * as bcrypt from 'bcrypt';

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUser();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const getUsersById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const user = <RowDataPacket>(await getUserById(userId))[0];

    console.log('getUsersById', user.email);

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const getUsersEmployee: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUserEmployee();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const getUsersCustomer: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUserCustomer();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};


// Get New Employees
export const getNewEmployees: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getNewEmployee();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

// Get % New Employees
export const getNewEmployeesPercentage: RequestHandler = async (req: Request, res: Response) => {
  try {
    const employees = await userService.getNewEmployeePercentage();
    const employeesPercentage = employees[0].increase_percentage;
    // console.log("backend % of get New Employees Percentage: " + employeesPercentage);
    res.status(200).json({
      employeesPercentage,
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

// Get New Customers
export const getNewCustomers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getNewCustomer();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

// Get % New Customers
export const getNewCustomersPercentage: RequestHandler = async (req: Request, res: Response) => {
  try {
    const customers = await userService.getNewCustomerPercentage();
    const customersPercentage = customers[0].increase_percentage;
    // console.log("backend % of get New Customers Percentage: " + customersPercentage);
    res.status(200).json({
      customersPercentage,
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


export const deleteUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const user = await deleteUser(userId);

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const updateUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const values = [
      hashedPassword,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.address_line1,
      req.body.address_line2,
      req.body.city,
      req.body.province,
      req.body.postal_code,
      req.body.country,
      req.body.role,
      req.body.is_active
    ];

    console.log(values);
    const update = await updateUser(values, userId);

    //used to see if user was updated.
    const userUpdated = await getUserById(values[0]);
    res.status(200).json({
      update,
      userUpdated,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};
