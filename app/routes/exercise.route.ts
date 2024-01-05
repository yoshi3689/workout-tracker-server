import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getExerciseRecords, getPersonalRecords } from "../controllers/exercise.controller";



const exerciseRouter = Router();

exerciseRouter.use(verifyToken);

exerciseRouter.get('/:username/personalRecords', getPersonalRecords);
exerciseRouter.get('/:username/exerciseRecords', getExerciseRecords);

export default exerciseRouter