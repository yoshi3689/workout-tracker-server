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
      Please use this 6 digit code in the below link to verify your email,
      and verify your email via this link.
      
      ${verificationCode}

      If you do not know why you recieved this email, please report
      to the support team.
    
      ${process.env.NODE_ENV === "production" ? allowedOrigins[1] : allowedOrigins[0]}/verify-email/${sign(username, verificationCode)}
      

      Sweat Snap Support Team
      
      xxx-xxxx-xxx
      `,
    }
}