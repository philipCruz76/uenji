"use server";
import { db } from "@/lib/db";

export async function checkIfUserExists(email: string, isLogin: string) {
  if (isLogin === "register") {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return !user || "User already exists. Please sign In.";
  } else return true;
}
