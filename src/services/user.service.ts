import { UserQueries } from '../models/user.queries';
import { User } from '../types/user';
import { execute } from '../database';

// Get Users
export const getUser = () => {
  return execute<User[]>(UserQueries.GetUsers, []);
};

export const getUserById = (userId: string) => {
  return execute<User>(UserQueries.GetUserById, [userId]);
};

export const getUserByEmail = (email: string) => {
  return execute<User>(UserQueries.GetUserByEmail, [email]);
};

export const getUserEmployee = () => {
  return execute<User[]>(UserQueries.GetUsersEmployee, []);
};

export const getUserCustomer = () => {
  return execute<User[]>(UserQueries.GetUsersCustomer, []);
};
// Delete
export const deleteUser = (userId: any) => {
  return execute(UserQueries.DeleteUser, [userId]);
};

// Create
export const createUser = (values: any) => {
  return execute(UserQueries.CreateUser, [values]);
};

// Update
export const updateUser = (values: any, userId: any) => {
  return execute(UserQueries.UpdateUser, [...values, userId]);
};

export const verifySignup = (email: any) => {
  return execute(UserQueries.VerifySignup, [email]);
};

// Get New Employess & Customers
export const getNewEmployee = () => {
  return execute<User[]>(UserQueries.GetNewEmployees, []);
};
export const getNewCustomer = () => {
  return execute<User[]>(UserQueries.GetNewCustomers, []);
};

// Get % of New Employess & Customers
export const getNewEmployeePercentage = () => {
  return execute<User[]>(UserQueries.GetNewEmployeesPercentage, []);
};
export const getNewCustomerPercentage = () => {
  return execute<User[]>(UserQueries.GetNewCustomersPercentage, []);
};

export const updatePassword = (newPwd: any, email: any) => {
  return execute(UserQueries.UpdatePassword, [newPwd, email]);
};

export default {
  getUser,
  getUserById,
  getUserByEmail,
  deleteUser,
  createUser,
  updateUser,
  verifySignup,
  getNewEmployee,
  getNewCustomer,
  getNewEmployeePercentage,
  getNewCustomerPercentage,
  updatePassword,
};
