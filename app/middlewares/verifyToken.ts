import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken"

export const SECRET: Secret = process.env.REFRESH_TOKEN_SECRET;

export interface CustomRequest extends Request {
 token: string | JwtPayload;
 username: string | JwtPayload;
}

// check if the valid access token is present
export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization! as string || req.headers.Authorization! as string;
  if (!authHeader?.includes("Bearer ")) {
    res.status(401).send("You were not authenticated");
  }
  try {
    // THE BELOW IS HOW TO ACCESS 'Authorization' cookie
    const accessToken = authHeader.split(' ')[1];
    const tokenDecoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    (req as CustomRequest).token = tokenDecoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).send("Forbidden");
  }
  
}
// const 
// const config = require("../config/auth.config.js");
// const db = require("../models");
// const User = db.user;
// const Role = db.role;

