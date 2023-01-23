// import { db } from "./database"
import { Request, RequestHandler, Response } from "express";
import { createAddress} from "../services/address.service";

export const createAddresses: RequestHandler = async (req: Request, res: Response) => {
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

