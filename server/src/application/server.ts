import express, { Express, Request, Response } from "express";
import notFoundMiddleware from "../middleware/not-found";
const app: Express = express();

//middleware
notFoundMiddleware;

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
