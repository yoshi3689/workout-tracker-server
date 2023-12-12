import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createRoutine, getRoutines, updateRoutine } from "../controllers/routine.controller";


const routineRouter = Router();

routineRouter.use(verifyToken);

routineRouter.get('/routines/:username', getRoutines);
routineRouter.post("/routines/", createRoutine);
routineRouter.patch("/routines/", updateRoutine);

export default routineRouter