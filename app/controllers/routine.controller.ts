import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
import { create, getAll, update } from '../services/routine.service';

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;

    // find user by username
    const routines = await getAll(username);
    res.status(200).send(routines);

  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createRoutine = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "created a new routine" },);
    create(req.body);
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateRoutine = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "created a new routine" },);
    update(req.body);
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};