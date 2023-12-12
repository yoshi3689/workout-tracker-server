import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createRoutine, getRoutines, updateRoutine } from "../controllers/routine.controller";


const routineRouter = Router();

routineRouter.use(verifyToken);

routineRouter.get('/:username', getRoutines);
routineRouter.post("/", createRoutine);
routineRouter.patch("/", updateRoutine);

export default routineRouter