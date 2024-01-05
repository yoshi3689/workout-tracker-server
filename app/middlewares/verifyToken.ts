import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken"

export const SECRET: Secret = process.env.REFRESH_TOKEN_SECRET;

export interface CustomRequest extends Request {
 token: string | JwtPayload;
 username: string | JwtPayload;
}

// check if the valid access token is present
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization! as string || req.headers.Authorization! as string;
  if (!authHeader?.includes("Bearer ")) {
    res.status(401).send("You were not authenticated");
  }
  try {
    // THE BELOW IS HOW TO ACCESS cookie assigned to 'Authorization' header
    const accessToken = authHeader.split(' ')[1];
    const tokenDecoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    (req as CustomRequest).token = tokenDecoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).send("Forbidden");
  }
  
}
