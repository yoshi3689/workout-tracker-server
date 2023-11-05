import express, { Application } from 'express'
import exercises from "../exercises.json";
import cors, { CorsOptions } from 'cors';
import cookieParser from "cookie-parser";
// import helmet from 'helmet';
import mongoose from 'mongoose';
import { initial } from './app/models/role.model';
import dotenv from "dotenv";

import router from './app/routes/user.route';

dotenv.config()

const corsOptions: CorsOptions = {
  origin: "*",
};

const app: Application = express();


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());p
// app.use(helmet())
app.use(router);

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/api", (req, res) => {
  res.json("this is api route");
});

app.get("/api/exercises", (req, res) => {
  res.json(exercises);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on`);
});

