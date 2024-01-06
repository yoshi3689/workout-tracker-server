import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getLiftableWeightsByExercise, getPersonalRecords } from "../controllers/exercise.controller";



const exerciseRouter = Router();

exerciseRouter.use(verifyToken);

exerciseRouter.get('/:username/personalRecords', getPersonalRecords);
exerciseRouter.get('/:username/liftableWeights', getLiftableWeightsByExercise);

export default exerciseRouter