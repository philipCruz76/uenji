"use server";
import { passwordResetEmailEN } from "@/constants/email/passwordResetEmailEN";
import { passwordResetEmailPT } from "@/constants/email/passwordResetEmailPT";
import { createTransport } from "nodemailer";
import { generateRandomString } from "../utils";
import db from "@/lib/db";
import { getLocale } from "next-intl/server";

export async function sendPasswordResetEmail(email: string) {
  try {
    const locale = await getLocale();
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error(
        "O email não está cadastrado no sistema. Por favor, tente novamente.",
      );
    }

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
      html:
        locale === "pt"
          ? passwordResetEmailPT(email, passwordResetToken)
          : passwordResetEmailEN(email, passwordResetToken),
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
    return { ok: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
