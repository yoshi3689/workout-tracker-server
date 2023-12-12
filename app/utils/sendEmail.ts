import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
;

//function to send email to the user
export const sendEmail = async({to, subject, text}: MailOptions) => {

  try {
    let mailOptions: MailOptions = ({
      to,
      subject,
      text
  })
  //asign createTransport method in nodemailer to a variable
  //service: to determine which email platform to use
  //auth contains the senders email and password which are all saved in the .env
  const Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APPPASSWORD,
      },
    });
      //return the Transporter variable which has the sendMail method to send the mail
      //which is within the mailOptions
    const res = await Transporter.sendMail(mailOptions);
    if (!res.accepted) throw new Error(res.response);
  } catch (error) {
    throw error;
  }
    
}