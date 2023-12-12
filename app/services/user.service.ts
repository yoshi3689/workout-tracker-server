import validate from "deep-email-validator";
import { User, IUser } from "../models/user.model"
import { compareSync } from "bcrypt";
import { OutputFormat } from "deep-email-validator/dist/output/output";

export const validateEmail = async (email : string) => {
  let res: OutputFormat;
  try {
    const u = await User.findOne({ email });
    if (u) throw new Error("The email is already in use by another acccount");
    res = await validate({
    email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: true,
    });
    if (!res.valid) throw new Error(res.reason);
  } catch (err) {
    throw err;
  }
}

export const register = async (user: IUser) => {
  try {
    // TODO: how to make a column unchangeable once the document is created -- for createdAt column
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

export const emailVerify = async (username: string) => {
  try {
    const res = await User.findOneAndUpdate(
      { username },
      { $set: { isEmailVerified: true } },
      { new: true }
    );
    
    if (!res) {
      throw new Error("email verification failed");
    }

    return;
  } catch (err) {
    throw err;
  }
};