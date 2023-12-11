import { Router } from "express";
import { authorize } from "../middlewares/verifyToken";
import { createRoutine, getRoutines, updateRoutine } from "../controllers/routine.controller";


const routineRouter = Router();

routineRouter.use(authorize);

routineRouter.get('/routines/:username', getRoutines);
routineRouter.post("/routines/", createRoutine);
routineRouter.patch("/routines/", updateRoutine);

export default routineRouter