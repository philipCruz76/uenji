import db from "@/lib/db";

export default async function getGigByTitle(
  username: string,
  gigTitle: string,
) {
  try {
    const decoder = new TextDecoder();

    const normalizedTitle = decodeURIComponent(gigTitle);

    const gig = await db.gig.findFirstOrThrow({
      where: {
        AND: [{ user: { username: username } }, { title: normalizedTitle }],
      },
      include: {
        user: true,
      },
    });

    return gig;
  } catch (error) {
    console.log(`GIG_LOOKUP_ERROR: gig-${gigTitle} ${username}`, error);
  }
}
