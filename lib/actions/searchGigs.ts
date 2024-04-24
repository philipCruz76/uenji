"use server";

import db from "@/lib/db";

const searchGigs = async (query: string) => {
  try {
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
      select: {
        title:true,
        user: {
            select: {
                username:true,
            }
        }
      }
    });
    return searchResults;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default searchGigs;
