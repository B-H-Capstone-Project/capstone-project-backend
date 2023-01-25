import { UserQueries } from "../models/user.queries";
import { User } from "../types/user";
import { execute } from "../database";

export const getUser = () => {
  return execute<User[]>(UserQueries.GetUsers, []);
};

export const getUserById = (userId:string) => {
  return execute<User>(UserQueries.GetUserById, [userId]);
};

export const deleteUser = (userId:string) => {
  return execute(UserQueries.DeleteUser, [userId]);
};

export const createUser = (values:any) => {
  return execute<User>(UserQueries.CreateUser, [values]);
};

export const updateUser = (values:any, userId:string) => {
  return execute<User>(UserQueries.UpdateUser, [...values, userId]);
};

export default { getUser, getUserById, deleteUser, createUser, updateUser };
