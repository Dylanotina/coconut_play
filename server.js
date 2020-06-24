import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./router.js";
import config from "./config/configDb";
import dotenv from "dotenv";
import { generate } from "./lib/generator";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

//Inject the different routes availables
routes(app);

//Routes in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  // If the route doesn't exist, send 404 error
  app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  });
}

//Root route to test the API status
app.get("/", (req, res) => {
  res.send("Server is listening...");
});

config();

/*generate().then(() => {
  app.listen(PORT, () => console.log(`Node server running on ${PORT}!`));
});
*/

app.listen(PORT, () =>
  console.log(`Node server running on ${PORT} in ${process.env.NODE_ENV} mode!`)
);
