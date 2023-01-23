// import { db } from "./database"
import { Request, RequestHandler, Response } from "express";
import { getUser, getUserById, deleteUser, updateUser } from "../services/user.service";

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
    const userId = req.params.id;
    const users = await getUserById(userId);

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

export const deleteUsers: RequestHandler = async ( req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const users = await deleteUser(userId);

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

export const updateUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const values = [
      req.body.email,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.address_id,
    
    ]
    /*
    const userId = req.params.id;
    const userEmail = req.params.email;
    const userPassword = req.params.password;
    const userFirst = req.params.first_name;
    const userLast = req.params.last_name;
    const userPhone = req.params.phone_number;
    const userAddress = req.params.address;
    */
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