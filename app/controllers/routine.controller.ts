import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    console.log(username, req.body);
    // find user by username
    // 
    res.status(200).send({ message: "getting all past workout routines (:" },);

  } catch (error) {
    console.log(error);
    return res.status(500).send(getErrorMessage(error));
  }
};