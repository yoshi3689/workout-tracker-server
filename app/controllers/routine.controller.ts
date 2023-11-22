import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
import { add } from '../services/routine.service';

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    // find user by username
    // 
    res.status(200).send({ message: "getting all past workout routines (:" },);

  } catch (error) {
    console.log(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createRoutine = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "created a new routine" },);
    add(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).send(getErrorMessage(error));
  }
};