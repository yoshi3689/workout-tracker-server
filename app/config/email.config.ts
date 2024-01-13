import { sign } from "jsonwebtoken";
import { allowedOrigins } from "./allowedOrigins";
import { randomBytes } from "crypto";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

export const createVerificationEmail = (email: string, username: string): MailOptions => {
  const verificationCode = randomBytes(6).toString("hex");
  return {
      from: process.env.EMAIL,
      to: `${email}`,
      subject: "Account Verification Link",
      text: `Hi ${username},
      
      Thank you for signing up with us! We are excited to be alongside
      with you for yout fitness journey (:
      Please use this code in the below link to verify your email,
      and verify your email via this link.
      
      Code: 
      ${verificationCode}
    
      Link: 
      ${process.env.NODE_ENV === "production" ? allowedOrigins[1] : allowedOrigins[0]}/verify-email/${sign(username, verificationCode)}
      
      If you do not know why you recieved this email, please report
      to the support team.

      Sweat Snap Support Team
      
      xxx-xxxx-xxx
      `,
    }
}

export const createPWResetEmail = (email: string, username: string): MailOptions => {
  const verificationCode = randomBytes(6).toString("hex");
  return {
      from: process.env.EMAIL,
      to: `${email}`,
      subject: "Account Password Reset Link",
      text: `Hi there,
      
      Thank you for being with us for your fitness journey!

      Please reset your password via the link below .
      
      Code: 
      ${verificationCode}
    
      Link: 
      ${process.env.NODE_ENV === "production" ? allowedOrigins[1] : allowedOrigins[0]}/reset-password/${sign(username, verificationCode)}
      
      If you do not know why you recieved this email, please report
      to the support team.

      Sweat Snap Support Team
      
      xxx-xxxx-xxx
      `,
    }
}