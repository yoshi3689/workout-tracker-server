import validate from "deep-email-validator";
import { User, IUser } from "../models/user.model"
import { compareSync } from "bcrypt";
import { OutputFormat } from "deep-email-validator/dist/output/output";
import { verify, JwtPayload } from "jsonwebtoken";

export const validateEmail = async (email : string) => {
  let res: OutputFormat;
  try {
    const u = await findByEmail(email);
    if (u) throw new Error("The email is already in use by another acccount");
    res = await validate({
    email: email,
    sender: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: false,
  });
    console.log(res)
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
    if (!res) throw new Error("user with this username not found");
    return res 
  } catch (err) {
    throw err;
  }
}

export const findByEmail = async (email: string): Promise<IUser> => {
  try {
    const res = await User.findOne({ email });
    if (!res) throw new Error("user with this email not found");
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
    console.log(res+ " is found");
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

export const verifyEmail = async (userInfoEncoded: string, verificationCode: string) => {
  try {
    const decoded = verify(
    userInfoEncoded,
    verificationCode,
    );

    const res = await User.findOneAndUpdate(
      { username:decoded },
      { $set: { isEmailVerified: true } },
      { new: true }
    );
    console.log(res);
    if (!res) throw new Error("cannot update email verification status");
    
    

    return;
  } catch (err) {
    throw err;
  }
};