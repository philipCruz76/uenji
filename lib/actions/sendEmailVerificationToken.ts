"use server";
import { createTransport } from "nodemailer";
import { htmlEmail } from "@/constants/email/activateAccountEmail";

export async function sendEmailVerificationToken(
  email: string,
  verificationToken: string,
  activateLinkToken: string,
) {
  try {
    const emailVerification = await await createTransport({
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
      subject: "Activate your new account",
      html: htmlEmail(email, verificationToken, activateLinkToken),
    });
    console.log("Message sent: %s", emailVerification.messageId);
    return emailVerification;
  } catch (error) {
    console.log(error);
    return error;
  }
}
