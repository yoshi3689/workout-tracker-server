import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
// import { CustomRequest } from '../middlewares/verifyToken';
import { sendEmail } from '../utils/sendEmail';
// import jwt, { JwtPayload } from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  //TODO: Upon user arriving at the login route, how do i let user redirect to the homepage when they have the token?
  // if (req.cookies['jwt']) {
  //   const token = req.cookies['jwt'];
  //   const decoded = jwt.verify(token, process.env.JWTSECRET);
  //   res.redirect("/" + decoded);
  // }
  let foundUser = null;
  try {
    foundUser = await userServices.login(req.body);
    // console.log(foundUser)
    if (!foundUser) return res.status(403).send(foundUser);

    res.cookie("Authorization", foundUser.token, {
      maxAge: 1 * 24 * 60 * 60,
      httpOnly: true,
    });
    res.status(201).send(foundUser.user);
    // res.redirect("/" + foundUser.user.username);
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
  try {
    const username = req.params.username;

    //find user by username and update isEmailVerified to true
    await userServices.emailVerify(username);
    return res.status(200).send({ message: "your email is verified! Proceed to login" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(getErrorMessage(error));
  }
};