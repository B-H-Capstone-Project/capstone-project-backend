import { UserQueries } from "../models/user.queries";
import { User } from "../types/user";
import { execute } from "../database";
import { assert } from "console";

export const getUser = () => {
  return execute<User[]>(UserQueries.GetUsers, []);
};

export const getUserById = (userId:any) => {
  return execute<User[]>(UserQueries.GetUserById, [userId]);
};

export const deleteUser = (userId:any) => {
  return execute(UserQueries.DeleteUser, [userId]);
};

export const createAddress = (values:any) => {
  return execute(UserQueries.CreateAddress, [values]);
};

export const createUser = (values:any) => {
  return execute(UserQueries.CreateUser, [values]);
};

export const updateUser = (values:any, userId:any) => {
  return execute(UserQueries.UpdateUser, [...values, userId]);
};

export default { getUser, getUserById, deleteUser, createAddress, createUser, updateUser };
