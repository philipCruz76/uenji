"use server";
import db from "@/lib/db";

export async function activateUser(
  email: string,
  token: string,
  activatedViaLink?: boolean,
) {
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

    if (!activatedViaLink) {
      await db.activateToken.delete({
        where: {
          token,
        },
      });
      console.log("Token deleted successfully");
    }

    console.log("User %s activated successfully ", email);
  } catch (error: any) {
    console.error("USER_ACTIVATION_ERROR");
    console.error(error);
  }
}
