"use server";

import db from "@/lib/db";

export default async function getPopularGigs(gigCategory?: string) {
  try {
    if (!gigCategory) gigCategory = "programacao";

    const popularGigs = await db.gig.findMany({
      where: {
        category: gigCategory,
        published: true,
      },

      include: {
        user: {
          select: {
            username: true,
            name: true,
            image: true,
            displayName: true,
          },
        },
      },
    });

    if (!popularGigs) {
      return [];
    }

    return popularGigs;
  } catch (error) {
    console.log("GIG_LOOKUP_ERROR: ", error);
  }
}
