"use server";
import { PasswordResetLinkValidator } from "@/types/passwordReset.types";
import { db } from "../db";

export default async function getPasswordResetToken(
  token: string,
  email: string,
) {
  const isValid = PasswordResetLinkValidator.parseAsync({ token, email });
  if (!isValid) return false;
  const resetToken = await db.passwordResetToken.findUnique({
    where: {
      token,
      userEmail: email,
      createdAt: {
        gte: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours
      },
    },
  });
  if (!resetToken) {
    return false;
  } else {
    return true;
  }
}
