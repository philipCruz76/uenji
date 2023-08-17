"use server";
import { db } from "@/lib/db";

export async function activateUser(email: string, token: string) {
  try {
    console.log("Activating user with token %s", token);

    await db.user.update({
      where: {
        email,
      },
      data: {
        active: true,
      },
    });

    await db.activateToken.update({
      where: {
        token,
      },
      data: {
        activatedAt: new Date(Date.now()),
      },
    });

    console.log("User %s activated successfully ", email);
  } catch (error: any) {
    console.error("USER_ACTIVATION_ERROR");
    console.error(error);
  }
}
