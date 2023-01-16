import express, { Express, Request, Response } from "express";
import errorHandlerMiddleware from "./src/middleware/error-handler";
import notFoundMiddleware from "./src/middleware/not-found";
import { getUsers } from "./src/controllers/user.contoller";
import * as MySQLConnector from "./src/database";
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.get("/get/users", getUsers);

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

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
