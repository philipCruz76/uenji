"use server";
import db from "@/lib/db";

export default async function getUserGigs(userId: string) {
  try {
    const userGigs = await db.gig.findMany({
      where:  {
        userId: userId,
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!userGigs) {
      return [];
    }

    return userGigs;
  } catch (error) {
    console.log("GIG_LOOKUP_ERROR: ", error);
  }
}
