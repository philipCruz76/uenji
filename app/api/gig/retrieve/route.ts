import getCurrentUserWithExtraInfo from "@/lib/actions/getCurrentUserWithExtraInfo";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUserWithExtraInfo();
    const { searchParams } = new URL(request.url);

    const gigTitle = searchParams.get("gigName")?.replace(/-/g, " ");

    if (!currentUser || !gigTitle) {
      return Response.error();
    }

    const desiredGig = currentUser.Gig.find((gig) => gig.title === gigTitle);

    return !desiredGig ? Response.error() : Response.json(desiredGig);
  } catch (error) {
    console.error("Gig Creation error: ", error);
    return Response.error();
  }
}
