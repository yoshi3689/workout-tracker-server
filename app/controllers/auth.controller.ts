import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
import { CustomRequest } from '../middlewares/verifyToken';
import { sign } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const signin = async (req: Request, res: Response) => {
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
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      throw new Error("Refresh token not present in the request");
    } 
    
    const tokenDecoded = jwt.verify(
      cookies.jwt,
      process.env.REFRESH_TOKEN_SECRET
    );
    
    const accessToken = sign(
      {username:(tokenDecoded as CustomRequest).username},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    res.status(201).send(accessToken);
  
  } catch (err) {
    console.error(err);
    res.status(401).send("You were not authenticated");
  }
}

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(204).json({ message: "Already logged out"});
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  return res.json({ message: 'Cookie cleared' });
}