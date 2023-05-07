import express, { Response, Request } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const api = express();
const port = 3000;

api.use(express.json());

api.get("/", (req: Request, res: Response) => {
  res.send("FakeStore API is Runiing");
});

api.use("/fakestoreapi.com", router);
api.use(errorHandler);

api.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
