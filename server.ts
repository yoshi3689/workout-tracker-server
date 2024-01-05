import express, { Application } from 'express'
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import dotenv from "dotenv";

import userRouter from './app/routes/user.route';
import routineRouter from './app/routes/routine.route';
import authRouter from './app/routes/auth.route';

import { corsOptions } from './app/config/cors.config';
import { COMMON_PREFIX, R_R_PREFIX, U_R_PREFIX, A_R_PREFIX, E_R_PREFIX } from './app/config/paths.config';
import exerciseRouter from './app/routes/exercise.route';



dotenv.config()

const app: Application = express();


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(COMMON_PREFIX + U_R_PREFIX, userRouter);
app.use(COMMON_PREFIX + R_R_PREFIX, routineRouter);
app.use(COMMON_PREFIX + E_R_PREFIX, exerciseRouter);
app.use(COMMON_PREFIX + A_R_PREFIX, authRouter)

mongoose
  .connect(process.env.MONGO_C_STRING)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

