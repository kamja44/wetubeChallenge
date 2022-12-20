import express from "express";

const app = express();
const port = 4000;
app.get("/", (req, res) => {
  return res.end();
});
app.get("/login", (req, res) => {
  return res.send("Login Here");
});
const handleListening = () =>
  console.log(`Server listening on Port http://localhost:${port}`);
app.listen(port, handleListening);
