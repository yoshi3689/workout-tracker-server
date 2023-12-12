import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';


// import { CustomRequest } from '../middlewares/verifyToken';
import { sendEmail } from '../utils/sendEmail';
import { CustomRequest } from '../middlewares/verifyToken';
import { createEmailConfig } from '../config/email.config';

export const signup = async (req: Request, res: Response) => {
  try {
    await userServices.validateEmail(req.body.email);
    await userServices.register(req.body);
    await sendEmail(createEmailConfig(req.body.email, req.body.username));

    res.status(200).send("Account Successfully Created! An email verification link was sent to the email address on file. Please Verify your email to log in.");
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};



export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    await userServices.emailVerify(username);
    return res.status(200).send({ message: "Congrats! Your email is verified. Please proceed to signin (:" });
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};