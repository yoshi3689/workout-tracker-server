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
    const res = await User.findOneAndUpdate(
      { username: user.username },
      { $set: { lastActiveAt: new Date() } },
      {
        new: true
      }
      );
    
    if (!res) {
      throw new Error("username incorrect");
    }
    const isMatch = compareSync(user.password, res.password);
    if (!isMatch) {
      throw new Error("password incorrect");
    }

    // TODO: how to make a column unchangeable once the document is created??

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