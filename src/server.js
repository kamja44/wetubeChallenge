import express from "express";
import morgan from "morgan";

const app = express();
const port = 4000;
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const privateMiddleware = (req, res, next) => {
  const url = req.url;

  if (url == "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("allowed");
  next();
};
const handleHome = (req, res) => {
  return res.end();
};
const handleProtected = (req, res) => {
  return res.send("welcome to the private lounge");
};
app.use(morgan(""));
app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`Server listening on Port http://localhost:${port}`);
app.listen(port, handleListening);
