import express, { Application } from 'express'
import cors, { CorsOptions } from 'cors';
import cookieParser from "cookie-parser";
// import helmet from 'helmet';
import mongoose from 'mongoose';
import { initial } from './app/models/role.model';
import dotenv from "dotenv";

import userRouter from './app/routes/user.route';
import exerciseRouter from './app/routes/exercise.route';
import routineRouter from './app/routes/routine.route';

dotenv.config()

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app: Application = express();


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(helmet())
const common_prefix = "/api"
app.use(common_prefix, userRouter);
app.use(common_prefix,routineRouter);
app.use(common_prefix, exerciseRouter);

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

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

