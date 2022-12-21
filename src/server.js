import express from "express";

const app = express();
const port = 4000;
const gossipMiddleware = (req, res, next) => {
  console.log(`Someone is going to: ${req.url}`);
  next();
};
const handleHome = (req, res) => {
  return res.end();
};
app.get("/", gossipMiddleware, handleHome);

const handleListening = () =>
  console.log(`Server listening on Port http://localhost:${port}`);
app.listen(port, handleListening);
