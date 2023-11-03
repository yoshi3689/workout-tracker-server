import { User, IUser } from "../models/user.model"
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export interface SignedInUser {
  user: IUser;
  token: string;
}

export const register = async (user: IUser): Promise<Boolean> => {
  try {
    const now = new Date();
    const res = await User.create({
      ...user,
      createdAt: now,
      lastActiveAt: now,
      routines: null
    });
    console.log(res);
    return res != null;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

export const login = async (user: IUser): Promise<SignedInUser> => {
  try {
    const res = await User.findOne({ username: user.username });
    
    if (!res) {
      throw new Error("Name of user is not correct");
    }
    const isMatch = compareSync(user.password, res.password);
    if (!isMatch) {
      throw new Error("password incorrect");
    }

    // TODO: update lastActiveAt to the current datetime

    const token = sign(
      { _id: res._id?.toString(), username: res.username },
      process.env.JWTSECRET,
      {
        expiresIn: "2 days",
      }
    );
    res.password = "";
    return { user: res, token };
  } catch (err) {
    throw err;
  }
};