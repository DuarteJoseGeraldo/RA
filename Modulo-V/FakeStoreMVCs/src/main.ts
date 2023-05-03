import express, { Response, Request } from "express";
import { router } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("FakeStore API is Runiing");
});

app.use("/fakestoreapi.com", router);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
