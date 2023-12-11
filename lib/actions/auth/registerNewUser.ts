"use server";

import { db } from "@/lib/db";
import { LoginCredentials } from "@/types/login.types";
import { sendEmailVerificationToken } from "../sendEmailVerificationToken";
import { generateRandomString } from "@/lib/utils";

async function registerNewUser(data: LoginCredentials) {
  try {
    const bcrypt = require("bcryptjs");
    const { email, password } = data;
    const activateLinkToken = generateRandomString(20);
    let verificationToken = "";
    const lenght = 6;

    for (let i = 0; i < lenght; i++) {
      verificationToken += Math.floor(Math.random() * 10);
    }

    if (!email || !password) {
      throw new Error("Missing info");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await sendEmailVerificationToken(
      email,
      verificationToken,
      activateLinkToken,
    );

    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        image:
          "https://res.cloudinary.com/dqe71igxe/image/upload/v1694603551/default-user_avatar.svg",
      },
    });

    await db.activateToken.create({
      data: {
        token: `${verificationToken}`,
        userId: user.id,
        userEmail: email,
        activationLink: activateLinkToken,
        activatedAt: null,
      },
    });

    console.log("New User Created Successfully : %s", email);
  } catch (error: any) {
    console.error(error, "REGISTRATION_ERROR");
  }
}

export default registerNewUser;
