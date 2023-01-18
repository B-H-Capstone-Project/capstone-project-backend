// import { db } from "./database"
import { Request, RequestHandler, Response } from "express";
import { getUser } from "../services/user.service";

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