"use server";

import db from "@/lib/db";

const searchGigsFull = async (query: string) => {
  try {
    if (query.length < 3)
      throw new Error("Query must be at least 3 characters long");
    const searchResults = await db.gig.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            features: {
              has: query.toUpperCase(), // split the query into an array of characters
            },
          },
        ],
      },
      include: {
        user: true,
      },
    });
    return searchResults;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default searchGigsFull;
