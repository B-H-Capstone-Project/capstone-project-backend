import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (email: string, subject: string, text: string) => {
  console.log('sendEmail');
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
    });

    console.log('email sent successfully');
    return true;
  } catch (error) {
    console.log('email not sent');
    console.log(error);
    return false;
  }
};
