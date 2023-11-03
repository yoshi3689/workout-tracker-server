import { User, IUser } from "../models/user.model"
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET } from "../middlewares/verifyToken";

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
      routines: []
    });
    console.log(res.username + " is created");
    return res != null;
  } catch (err) {
    throw err;
  }
}

export const login = async (user: IUser): Promise<SignedInUser> => {
  try {
    const res = await User.findOne({ name: user.username });
    
    if (!res) {
      throw new Error("Name of user is not correct");
    }
    console.log(res.username + " is found");

    const isMatch = compareSync(user.password, res.password);
    if (!isMatch) {
      throw new Error("password incorrect");
    }

    // TODO: update lastActiveAt to the current datetime

    const token = sign(
      { _id: res._id?.toString(), name: res.username },
      SECRET,
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