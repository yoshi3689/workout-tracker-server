import { Request, Response } from 'express';

import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';
import { sendEmail } from '../utils/sendEmail';
import { createPWResetEmail, createVerificationEmail } from '../config/email.config';
import { validateEmail } from '../utils/validateEmail';
import { verify } from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    await validateEmail(req.body.email);
    const found = await userServices.findByEmailOrUsername(req.body.email, req.body.username);
    if (found) return res.status(400).send("User with the same username or email already exists");
    await userServices.register(req.body);
    await sendEmail(createVerificationEmail(req.body.email, req.body.username));

    res.status(200).send("Account Successfully Created! An email verification link was sent to the email address on file. Please Verify your email to log in.");
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const u = await userServices.findByEmail(req.body.email);
    if (!u) throw new Error("user with this email not found");

    await sendEmail(createVerificationEmail(req.body.email, u.username));
    res.status(200).send(`Account Verification email is sent to ${req.body.email}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  try {
    const u = await userServices.findByEmail(req.body.email);
    if (!u) throw new Error("user with this email not found");

    await sendEmail(createPWResetEmail(req.body.email, u.username));
    res.status(200).send(`Password Reset email is sent to ${req.body.email}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const userInfoEncoded = req.params.userInfoEncoded;
    await userServices.verifyEmail(userInfoEncoded, req.body.code);
    return res.status(200).send("Congrats! Your email is verified. Please proceed to sign in (:");
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    await userServices.resetPassword(req.body.newPassword, req.body.userInfoEncoded, req.body.code);
    return res.status(200).send("Code is verified. Password is updated!");
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const u = await userServices.findByUsername(req.params.username);
    res.status(200).send(u);
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const u = await userServices.findByUsername(req.body.user);
    res.status(200).send(u);
  } catch (error) {
    console.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

