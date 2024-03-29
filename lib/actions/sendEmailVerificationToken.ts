"use server";
import { createTransport } from "nodemailer";
import { activateAccountEmailEN } from "@/constants/email/activateAccountEmailEN";
import { activateAccountEmailPT } from "@/constants/email/activateAccountEmailPT";
import { getLocale } from "next-intl/server";

export async function sendEmailVerificationToken(
  email: string,
  verificationToken: string,
  activateLinkToken: string,
) {
  try {
    const locale = await getLocale();
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
      subject: "Activate your new account",
      html:
        locale === "pt"
          ? activateAccountEmailPT(email, verificationToken, activateLinkToken)
          : activateAccountEmailEN(email, verificationToken, activateLinkToken),
    });
    console.log("Message sent: %s", emailVerification.messageId);
  } catch (error) {
    console.log(error);
    return error;
  }
}
