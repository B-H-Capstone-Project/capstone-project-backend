import { Request, RequestHandler, Response } from "express";
import { createAddress, deleteAddress, getAddressById, updateAddress } from "../services/address.service";

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

  export const deleteAddresses: RequestHandler = async (req: Request, res: Response) => {
    try {
      const addressId = req.params.id;
      const address = await deleteAddress(addressId);
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

export const getAddressesById: RequestHandler = async (req: Request, res: Response) => {
try {
    const addressId = req.params.id;
    
    const address = await getAddressById(addressId);
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

export const updateAddresses: RequestHandler = async (req: Request, res: Response) => {
    try {
        const address_id = req.params.id;
        
        const values = [
            req.body.unit_number,
            req.body.address_line,
            req.body.postal_code,
            req.body.city,
            req.body.province,
            req.body.country,
        ]
        console.log(values);
        
        const address = await updateAddress(values, address_id);
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
