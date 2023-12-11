import { Router } from "express";
// import { body } from "express-validator"
import { authorize } from "../middlewares/verifyToken";
import { createRoutine, getRoutines, updateRoutine } from "../controllers/routine.controller";
import cors from "cors";
import { corsOptions } from "../../server";

const routineRouter = Router();

routineRouter.use(authorize);

routineRouter.options('/routines/:username', cors(corsOptions));
routineRouter.get('/routines/:username', cors(corsOptions), getRoutines);
routineRouter.post("/routines/", createRoutine);
routineRouter.patch("/routines/", updateRoutine);

export default routineRouter