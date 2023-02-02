import { Request, RequestHandler, Response } from "express";
import { getUser, getUserById, deleteUser, createUser, updateUser } from "../services/user.service";
import { createAddress } from '../services/address.service';


export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUser();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(
      "[teams.controller][getTeams][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching teams",
    });
  }
};

export const getUsersById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId:string = req.params.id;
    const user = await getUserById(userId);

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(
      "[teams.controller][getTeams][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching teams",
    });
  }
};

export const deleteUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId:string = req.params.id;
    const user = await deleteUser(userId);

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(
      "[teams.controller][getTeams][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching teams",
    });
  }
};

export const createUsers = async (values: any, addValues: any) => {
  try {
    const address = await createAddress(addValues);    
    const user = await createUser(values);
    console.log(user);
  } catch (error) {
    console.error(
      "[user.controller][CreateUser][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
  }
};


export const updateUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId:string = req.params.id;

    const values = [
      req.body.email,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.address_id,
    ]
    
    const update = await updateUser(values, userId);

    //used to see if user was updated.
    const userUpdated = await getUserById(values[0]);
    res.status(200).json({
      update,
      userUpdated,
    });
  } catch (error) {
    console.error(
      "[teams.controller][getTeams][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching teams",
    });
  }
};