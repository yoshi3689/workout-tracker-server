import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken"

export const SECRET: Secret = process.env.JWTSECRET;

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error("token not resent in the request");
    }
    
    const tokenDecoded = jwt.verify(token, SECRET);
    (req as CustomRequest).token = tokenDecoded;
    next();
  } catch (err) {
    res.status(401).send("You were not authenticated");
  }
}
// const 
// const config = require("../config/auth.config.js");
// const db = require("../models");
// const User = db.user;
// const Role = db.role;

