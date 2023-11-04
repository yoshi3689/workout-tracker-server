import nodemailer from "nodemailer";;

export interface MailOptions {
  from: string;
  to : string;
  subject : string;
  text: string;
}

//function to send email to the user
export const sendEmail = async({from, to, subject, text}: MailOptions) => {

  try {
    let mailOptions = ({
      from,
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
    return await Transporter.sendMail(mailOptions) 
  } catch (error) {
    console.log(error)
    throw new Error("email send fail");
  }
    
}