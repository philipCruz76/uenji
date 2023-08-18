"use server";
import { db } from "@/lib/db";
import { LoginCredentials } from "@/types/login.types";
import { sendEmailVerificationToken } from "../sendEmailVerificationToken";

export async function registerNewUser(data: LoginCredentials) {
  try {
    const bcrypt = require("bcryptjs");
    const { email, password } = data;

    let verificationToken = "";
    const lenght = 6;

    for (let i = 0; i < lenght; i++) {
      verificationToken += Math.floor(Math.random() * 10);
    }

    if (!email || !password) {
      throw new Error("Missing info");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    sendEmailVerificationToken(email, verificationToken);

    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    await db.activateToken.create({
      data: {
        token: `${verificationToken}`,
        userId: user.id,
        userEmail: email,
        activatedAt: null,
      },
    });

    console.log("New User Created Successfully : %s", email);
  } catch (error: any) {
    console.error("REGISTRATION_ERROR");
    console.error(error);
  }
}

export default registerNewUser;
