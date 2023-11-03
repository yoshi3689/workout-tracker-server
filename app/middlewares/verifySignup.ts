import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { ROLES } from "../config/db.config";

// middlewares to verify a new user's username, email, and role provided
export const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
  let user;
  try {
    user = await User.findOne({ username: req.body.username });
  if (user) {
    res.status(400)
      .send({ message: "Failed! Username is already in use!" });
    return;
  }
    user = await User.findOne({ email: req.body.email });
    if (user) {
    res.status(400)
      .send({ message: "Failed! email is already in use!" });
    return;
  }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
  next();
};

export const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
}
