import { Router } from "express";
import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import exercises from "../../exercises.json"

const exerciseRouter = Router();

exerciseRouter.get("/exercises", (req: Request, res: Response) => {
  try {
    res.json(exercises).status(200);

  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
}
);

export default exerciseRouter;