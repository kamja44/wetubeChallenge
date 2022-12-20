import express from "express";

const app = express();
const port = 4000;
const handleListening = () =>
  console.log(`Server listening on Port http://localhost:${port}`);
app.listen(port, handleListening);
