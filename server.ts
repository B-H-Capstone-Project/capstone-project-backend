import express, { Express, Request, Response } from "express";
import cors from "cors";

import errorHandlerMiddleware from "./src/middleware/error-handler";
import notFoundMiddleware from "./src/middleware/not-found";
import * as MySQLConnector from "./src/database";
import userRouter from "./src/router/user.router";
import resrvationRouter from "./src/router/reservation.router";
import authRouter from "./src/router/auth.router";

const app: Express = express();

app.use(express.json());
app.use(cors());


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
