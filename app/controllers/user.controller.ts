import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
import { CustomRequest } from '../middlewares/verifyToken';
import { sendEmail } from '../utils/sendEmail';

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
    // TODO: research the best practice for letting user log in after registration
    // const foundUser = await userServices.login(req.body);
    // res.status(200).send(foundUser);
    await sendEmail({
      from: "no-reply@example.com",
      to: `${req.body.email}`,
      subject: "Account Verification Link",
      text: `Hello, ${req.body.username} Please verify your email by
                clicking this link :
                http://localhost:5001/verify-email/${req.body.username}`,
    });
    res.status(200).send("Inserted successfully and email sent");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  res.status(200).send({ message: "this is verification route" });
  // try {
  //   await userServices.register(req.body);
  //   console.log(req.body)
  //   res.status(200).send("Inserted successfully");
  //   // TODO: research the best practice for letting user log in after registration
  //   // const foundUser = await userServices.login(req.body);
  //   // res.status(200).send(foundUser);
  // } catch (error) {
  //   return res.status(500).send(getErrorMessage(error));
  // }
};