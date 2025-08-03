import cors from "cors";
import Connectiondb from "../../db/Connectiondb.js";
import * as appRouters from "../modules/app.routes.js";
import globalErrorHandling from "./error_handling.js";
const App = (app, express) => {
  app.use(express.json({}));
  app.use(cors());
  Connectiondb();
  app.use("/user", appRouters.userRouter);
  app.use("/movie", appRouters.movieRouter);
  app.get("/", (req, res) => res.send("Welcome to our World "));
  //============================================================ routing
  app.use(globalErrorHandling);
};

export default App;
