"use server"

import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., "smtp.gmail.com"
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password or app password
    },
  });

  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // HTML body
  };

  await transporter.sendMail(mailOptions);
};
