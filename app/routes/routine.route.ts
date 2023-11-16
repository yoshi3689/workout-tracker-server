import { Router } from "express";
// import { body } from "express-validator"
import { authorize } from "../middlewares/verifyToken";
import { getRoutines } from "../controllers/routine.controller";

const routineRouter = Router();

routineRouter.use(authorize);

routineRouter.get("/dashboard/:username", getRoutines)
routineRouter.get("/", getRoutines)

export default routineRouter