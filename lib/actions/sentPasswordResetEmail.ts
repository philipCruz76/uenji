"use server";
import { passwordResetEmail } from "@/constants/email/passwordResetEmail";
import { createTransport } from "nodemailer";
import { generateRandomString } from "../utils";
import { db } from "../db";

export async function sendPasswordResetEmail(email: string) {
  try {
    const passwordResetToken = generateRandomString(20);
    const emailVerification = await createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER_NOREPLY,
        pass: process.env.EMAIL_PASS_NOREPLY,
      },
    }).sendMail({
      from: "Uenji" + "<" + process.env.EMAIL_USER_NOREPLY + ">",
      to: email,
      subject: "Reset your Uenji password",
      html: passwordResetEmail(email, passwordResetToken),
    });
    console.log("Message sent: %s", emailVerification.messageId);

    await db.passwordResetToken.create({
      data: {
        user: {
          connect: {
            email: email,
          },
        },
        token: `${passwordResetToken}`,
        userEmail: email,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}
