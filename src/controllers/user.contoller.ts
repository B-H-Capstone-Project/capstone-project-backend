// import { db } from "./database"
import { Request, RequestHandler, Response } from "express";
import { getUser, getUserById, deleteUser, createAddress, createUser } from "../services/user.service";

//static
const addressId:any = "";

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

export const createAddresses: RequestHandler = async ( req: Request, res: Response) => {
  try {
    const values = [
      req.body.unit_number,
      req.body.address_line,
      req.body.postal_code,
      req.body.city,
      req.body.province,
      req.body.country,
    ]
    const address = await createAddress(values);



    res.status(200).json({
      address,
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

export const createUsers: RequestHandler = async ( req: Request, res: Response) => {
  try {
    const values = [
      req.body.email,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      addressId
    ]
    const users = await createUser(values);

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

