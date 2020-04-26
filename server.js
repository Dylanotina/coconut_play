import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./router.js";
import config from "./config/configDb";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();
//Root route to test the API status
app.get("/", (req, res) => {
  res.send("Server is listening...");
});

//Inject the different routes availables
routes(app);

// If the route doesn't exist, send 404 error
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

config();

app.listen(PORT, () => console.log(`Node server running on ${PORT}!`));
