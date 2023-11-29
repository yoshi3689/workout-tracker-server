import { User, IUser } from "../models/user.model"
import { compareSync } from "bcrypt";

export interface SignedInUser {
  user: IUser;
  token: string;
}

export const register = async (user: IUser): Promise<Boolean> => {
  try {
    // TODO: how to make a column unchangeable once the document is created -- for createdAt column
    const now = new Date();
    const res = await User.create({
      ...user,
      createdAt: now,
      lastActiveAt: now,
      routines: null,
    });
    return res != null;
  } catch (err) {
    console.error(err)
    throw err;
  }
}

export const findByUsername = async (username: string): Promise<IUser> => {
  try {
    const res = await User.findOne({ username });
    if (!res) throw new Error("user not found");
    return res 
  } catch (err) {
    throw err;
  }
}

export const login = async (user: IUser): Promise<IUser> => {
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

    if (!res.isEmailVerified) {
      throw new Error("Your email address is not verified yet. Check ur inbox for the verification email");
    }
    return res;
  } catch (err) {
    throw err;
  }
};

export const emailVerify = async (username: string) => {
  try {
    const res = await User.findOneAndUpdate(
      { username },
      { $set: { isEmailVerified: true } },
      {
        new: true
      }
      );
    
    if (!res) {
      throw new Error("email verification failed");
    }

    return;
  } catch (err) {
    throw err;
  }
};