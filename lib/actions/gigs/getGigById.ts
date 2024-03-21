"use server";
import db from "@/lib/db";

export default async function getGigById(gigId: string) {
  try {
    const gig = await db.gig.findFirstOrThrow({
      where: {
        id: gigId,
      },
      include: {
        user: true,
      },
    });

    if (!gig) throw new Error(`GIG_LOOKUP_ERROR: gig-${gigId} not found!`);

    return gig;
  } catch (error) {
    console.log(`GIG_LOOKUP_ERROR: gig-${gigId}`, error);
  }
}
