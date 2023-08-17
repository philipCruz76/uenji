"use server";

import { db } from "@/lib/db";

export default async function verifyOTP(otp: string) {
  const user = await db.user.findFirst({
    where: {
      ActivateToken: {
        some: {
          token: otp,
          createdAt: {
            gte: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
          },
          activatedAt: null,
        },
      },
    },
  });

  return !user ? false : true;
}
