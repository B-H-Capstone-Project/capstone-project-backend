import express, { Express, Request, Response } from "express";
import errorHandlerMiddleware from "../middleware/error-handler";
import notFoundMiddleware from "../middleware/not-found";
import connection from "./database";
const app: Express = express();

//middleware

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const start = async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
};

start();
