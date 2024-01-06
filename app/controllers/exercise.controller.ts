import { Request, Response } from 'express';

import { getErrorMessage } from '../utils/errors.util';
import { getExercisesOrderedByDate, getExercisesSortedByMaxWeight } from '../services/exercise.service';

export const getPersonalRecords = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const exercises = await getExercisesSortedByMaxWeight(username);
    res.status(200).send(exercises);
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getLiftableWeightsByExercise = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const exercises = await getExercisesOrderedByDate(username);
    res.status(200).send(exercises);
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
