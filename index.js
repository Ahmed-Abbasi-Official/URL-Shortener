import express, { urlencoded } from "express";
import router from "./routes/url.js";
import CONNECTDB from "./db/CONNECTDB.js";
import URL from "./models/url.model.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000;

CONNECTDB(`mongodb://localhost:27017/short-url`).then(() =>
  console.log("MongodbConnected")
);

app.use(express.json());
app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use("/url", router);

app.listen(port, () => {
  console.log(`Port listen on ${port}`);
});
