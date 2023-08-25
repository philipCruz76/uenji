"use server";

import { redirect } from "next/navigation";
import { db } from "../db";

export async function resetPassword(
  formData: FormData,
  email: string,
  password: string,
) {
  console.log("RESET PASSWORD", password);
  try {
    const bcrypt = require("bcryptjs");

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("HASHED PASSWORD", hashedPassword);
    await db.user.update({
      where: {
        email,
      },
      data: {
        hashedPassword,
      },
    });

    await db.passwordResetToken.deleteMany({
      where: {
        userEmail: email,
      },
    });

    console.log("PASSWORD_RESET_SUCCESS");
  } catch (e) {
    console.error("PASSWORD_RESET_ERROR");
    console.error(e);
  }
  redirect("/");
}
