import express from "express";
import morgan from "morgan";

const app = express();
const port = 4000;
const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");
globalRouter.get("/", handleHome);
const userRouter = express.Router();
const handleEidtUsers = (req, res) => res.send("Users");
userRouter.get("/edit", handleEidtUsers);
const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch Video");
videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("users", userRouter);

const handleListening = () =>
  console.log(`Server listening on Port http://localhost:${port}`);
app.listen(port, handleListening);
