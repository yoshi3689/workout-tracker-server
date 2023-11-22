import { Router } from "express";
// import { body } from "express-validator"
import { authorize } from "../middlewares/verifyToken";
import { createRoutine, getRoutines } from "../controllers/routine.controller";

const routineRouter = Router();

routineRouter.use(authorize);

routineRouter.get("/dashboard/:username", getRoutines);
routineRouter.get("/routines/", getRoutines);
routineRouter.post("/routines/", createRoutine);

export default routineRouter