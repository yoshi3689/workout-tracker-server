import { User, IUser } from "../models/user.model"
import { compareSync } from "bcrypt";
import { verify, JwtPayload } from "jsonwebtoken";
import { CallbackError, Document } from "mongoose";

export const register = async (user: IUser) => {
  try {
    const now = new Date();
    await User.create({
      ...user,
      createdAt: now,
      lastActiveAt: now,
      routines: null,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const findByUsername = async (username: string): Promise<IUser> => {
  try {
    const res = await User.findOne({ username });
    if (!res) throw new Error("user with this username not found");
    return res 
  } catch (err) {
    throw err;
  }
}

export const updateByUsername = async (userToUpdate: IUser): Promise<IUser> => {
  try {
    if (!userToUpdate.password) {
      const res = await User.findOneAndUpdate(
        { username: userToUpdate.username },
      { $set: { lastActiveAt: new Date(), email: userToUpdate.email } },
      { new: true }
    );
    }
    const res = await User.findOneAndUpdate(
      { username: userToUpdate.username },
      { $set: { lastActiveAt: new Date(), password: userToUpdate.password, email: userToUpdate.email } },
      { new: true }
    );
    if (!res) throw new Error("user with this username not found");
    return res 
  } catch (err) {
    throw err;
  }
}

export const findByEmailOrUsername = async (
  email: string,
  username: string
): Promise<IUser | null> => {
  try {
    const res = await User.findOne({
      $or: [{ email }, { username }],
    });

    return res;
  } catch (err) {
    throw err;
  }
};


export const findByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const res = await User.findOne({ email });
    return res;
  } catch (err) {
    throw err;
  }
}

export const login = async (user: IUser): Promise<IUser> => {
  try {
    const res = await User.findOneAndUpdate(
      { username: user.username },
      { $set: { lastActiveAt: new Date() } },
      { new: true }
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

export const verifyEmail = async (usernameEncoded: string, code: string) => {
  try {
    const decoded = verify(usernameEncoded, code);
    const res = await User.findOneAndUpdate(
      { username: decoded },
      { $set: { isEmailVerified: true } },
      { new: true }
    );
    if (!res) throw new Error("cannot update email verification status");
    
    return;
  } catch (err) {
    throw err;
  }
};

export const resetPassword = async (password: string, usernameEncoded: string, code: string) => {
  try {
    const decoded = verify(usernameEncoded, code);
    const res = await User.findOne(
      { username: decoded },
    )
    if (!res) throw new Error("user not found");
    res.password = password;
    await res.save();
    return;
  } catch (err) {
    throw err;
  }
};