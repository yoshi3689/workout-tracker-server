import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken"

export const SECRET: Secret = process.env.JWTSECRET;

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // THE BELOW IS HOW TO ACCESS 'Authorization' cookie
    // i was accessing the authorization header the entire time
    const token = req.cookies['Authorization']
    console.log(req.cookies);
    console.log(process.env.JWTSECRET, SECRET);

    if (!token) {
      throw new Error("token not present in the request");
    } else {
      const tokenDecoded = jwt.verify(token, process.env.JWTSECRET);
      (req as CustomRequest).token = tokenDecoded;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(["You were not authenticated"]);
  }
  
}
// const 
// const config = require("../config/auth.config.js");
// const db = require("../models");
// const User = db.user;
// const Role = db.role;

