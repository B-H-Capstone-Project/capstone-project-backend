import { UserQueries } from "../models/user.queries";
import { User } from "../types/user";
import { execute } from "../database";

export const getUser = () => {
  return execute<User[]>(UserQueries.GetUsers, []);
};
export const deleteUser = (userId:any) => {
  return execute(UserQueries.DeleteUser, [userId]);
};

export default { getUser, deleteUser };
