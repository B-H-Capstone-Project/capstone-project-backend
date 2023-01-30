import express from "express";
import * as addressController from "../controllers/address.controller";

const router = express.Router();

// Create User with Address
router.post("/address", addressController.createAddresses);

//Update address by id
router.put("/address/:id", addressController.updateAddresses);

//Delete addresses by id
router.delete("/address/:id", addressController.deleteAddresses);

//Get Address By Id
router.get("/address/:id", addressController.getAddressesById);

export default router;
