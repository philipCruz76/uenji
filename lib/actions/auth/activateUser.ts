"use server";
import { db } from "@/lib/db";

export async function activateUserViaLink(
  activationLink: string,
  userEmail: string,
) {
  console.log("validating link");
  const user = await db.user.findFirstOrThrow({
    where: {
      ActivateToken: {
        some: {
          userEmail,
          activationLink,
          createdAt: {
            gte: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
          },
          activatedAt: null,
        },
      },
    },
  });

  console.log("result", user ? "valid" : "invalid");
  if (!user) {
    throw new Error("Invalid activation link");
  } else {
    return {
      userEmail: user.email!,
      hashedPassword: user.hashedPassword!,
      validLink: true,
    };
  }
}

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
