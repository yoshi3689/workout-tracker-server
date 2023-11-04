import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
import { CustomRequest } from '../middlewares/verifyToken';

export const login = async (req: Request, res: Response) => {
  let foundUser = null;
  try {
    foundUser = await userServices.login(req.body);
    console.log(foundUser)
    if (foundUser) res.status(200).send(foundUser);
    else res.status(403).send(foundUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
    console.log(req.body)
    res.status(200).send("Inserted successfully");
    // TODO: research the best practice for letting user log in after registration
    // const foundUser = await userServices.login(req.body);
    // res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
    console.log(req.body)
    res.status(200).send("Inserted successfully");
    // TODO: research the best practice for letting user log in after registration
    // const foundUser = await userServices.login(req.body);
    // res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};