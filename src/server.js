import "./db.js";
import "./models/Video.js";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const app = express();
const port = 4000;
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("users", userRouter);

const handleListening = () =>
  console.log(`Server listening on Port http://localhost:${port}`);
app.listen(port, handleListening);
