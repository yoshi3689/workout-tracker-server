import { allowedOrigins } from "./allowedOrigins";

interface MailOptions {
  to : string;
  subject : string;
  text: string;
}

export const createEmailConfig = (email: string, username: string): MailOptions => {
  return {
      to: `${email}`,
      subject: "Account Verification Link",
      text: `Hello ${username},
      Thank you for signing up with us! 
      Please verify your email by clicking this link.
      ${allowedOrigins[1]}/verify-email/${Buffer.from(username).toString("base64url")}`,
    }
}