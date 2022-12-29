import "./db.js";
import "./models/Video.js";
import app from "./server.js";
const port = 4000;

const handleListening = () =>
  console.log(`Server listening on Port http://localhost:${port}`);
app.listen(port, handleListening);
