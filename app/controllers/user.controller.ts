import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
import { sign } from "jsonwebtoken";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

// import { CustomRequest } from '../middlewares/verifyToken';
import { sendEmail } from '../utils/sendEmail';
import { CustomRequest } from '../middlewares/verifyToken';
// import jwt, { JwtPayload } from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  let foundUser = null;
  try {
    foundUser = await userServices.login(req.body);
    if (!foundUser) return res.status(403).send(foundUser);
    const accessToken = sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    const refreshToken = sign(
      {
        username: foundUser.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1 day",
      }
    );


    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1 * 24 * 60 * 60 * 1000
    }
    );
    return res.status(201).send({accessToken});
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    // THE BELOW IS HOW TO ACCESS 'Authorization' cookie
    // i was accessing the authorization header the entire time
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      throw new Error("refresh token not present in the request");
    } 
    
    const tokenDecoded = jwt.verify(
      cookies.jwt,
      process.env.REFRESH_TOKEN_SECRET
    );

    console.log("this is refresh token decoded", tokenDecoded)
    
    const accessToken = sign(
      {username:(tokenDecoded as CustomRequest).username},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    res.status(201).send(accessToken);
  
  } catch (err) {
    console.log(err);
    res.status(401).send(["You were not authenticated"]);
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
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