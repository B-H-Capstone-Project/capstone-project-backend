import express, { Express, Request, Response } from "express";
import cors from "cors";

import errorHandlerMiddleware from "./src/middleware/error-handler";
import notFoundMiddleware from "./src/middleware/not-found";
import * as MySQLConnector from "./src/database";
import userRouter from "./src/router/user.router";
import resrvationRouter from "./src/router/reservation.router";
import authRouter from "./src/router/auth.router";
import uploadRouter from './src/router/upload.router'
const bodyParser = require('body-parser');


const app: Express = express();

app.use(express.json());
app.use(cors());

// body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get("/", (req: Request, res: Response) => {
  res.json("hello this is backend");
});    

// Router
// user
app.use(userRouter);

// reservation
app.use(resrvationRouter);

// signin
app.use("/auth", authRouter);

//upload image
app.use(uploadRouter);

// middleware
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
