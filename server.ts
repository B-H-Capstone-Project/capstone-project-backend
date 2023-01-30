import express, { Express, Request, Response } from "express";
import cors from "cors";

import errorHandlerMiddleware from "./src/middleware/error-handler";
import notFoundMiddleware from "./src/middleware/not-found";
import {
  getUsers,
  getUsersById,
  deleteUsers,
  createUsers,
  updateUsers,
} from "./src/controllers/user.contoller";
import {
  createAddresses,
  deleteAddresses,
  updateAddresses,
  getAddressesById,
} from "./src/controllers/address.controller";
import {
  createReservations,
  deleteReservations,
  updateReservations,
  getReservationsById,
  getReservationsByUsers,
} from "./src/controllers/reservation.controller";
import * as MySQLConnector from "./src/database";
import authRouter from "./src/router/auth";
import { signin } from "./src/controllers/auth.controller";
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  // res.send("hello");
  res.json("hello this is backend");
});

// Get User
app.get("/users", getUsers);

// Get User by Id
app.get("/user/:id", getUsersById);

// Delete User by Id
app.delete("/user/:id", deleteUsers);

// // Create Address
app.post("/address", createAddresses);

// Create User with Address
app.post("/user", createUsers);

//Update user by id
app.put("/user/:id", updateUsers);

//signin
app.use("/auth", authRouter);

//Update address by id
app.put("/address/:id", updateAddresses);

//Delete addresses by id
app.delete("/address/:id", deleteAddresses);

//Get Address By Id
app.get("/address/:id", getAddressesById);

//Update reservation by id
app.put("/reservation/:id", updateReservations);

//Delete reservation by id
app.delete("/reservation/:id", deleteReservations);

//Get reservation By Id
app.get("/reservation/:id", getReservationsById);

//Get reservation By User
app.get("/reservation/user/:user_id", getReservationsByUsers);

// Create reservation
app.post("/reservation", createReservations);

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const start = async () => {
  try {
    // connection;
    MySQLConnector.db();
  } catch (error) {
    console.log(error);
  }
};

start();
