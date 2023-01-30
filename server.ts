/*
import express, { Express, Request, Response } from "express";
import cors from "cors";

import errorHandlerMiddleware from "./src/middleware/error-handler";
import notFoundMiddleware from "./src/middleware/not-found";
import { getUsers, getUsersById, deleteUsers, createUsers, updateUsers } from "./src/controllers/user.contoller";
import {createAddresses, deleteAddresses, updateAddresses, getAddressesById} from "./src/controllers/address.controller";
import * as MySQLConnector from "./src/database";
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
// app.post("/address", createAddresses)

// Create User with Address
app.post("/user", createUsers)

//Update user by id
app.put("/user/:id", updateUsers)

//Update address by id
app.put("/address/:id", updateAddresses)

//Delete addresses by id
app.delete("/address/:id", deleteAddresses)

//Get Address By Id
app.get("/address/:id", getAddressesById)

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
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Stragegy;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const crypto = require('crypto');
import * as MySQLConnector from "./src/database";
let session = require('express-session');
let mySQLStore = require('express-mysql-session')(session);


const start = async () => {
  try {
    // connection;
    MySQLConnector.db();
  } catch (error) {
    console.log(error);
  }
};



app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlendcoded({
  extended: true
}));
app.use(express.static('public'));
app.use('view engine', 'ejs');
