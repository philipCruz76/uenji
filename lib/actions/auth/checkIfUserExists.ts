"use server";
import { db } from "@/lib/db";

export async function checkIfUserExists(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return !user ? false : true;
}
