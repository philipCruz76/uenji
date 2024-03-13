import getCurrentUserWithExtraInfo from "@/lib/actions/getCurrentUserWithExtraInfo";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUserWithExtraInfo();
    const searchParams = new URL(request.url).searchParams;
    const gigTitle = searchParams.get("gigName")?.replace(/-/g, " ");

    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }

    const gigToDelete = currentUser.Gig.find((gig) => gig.title === gigTitle);

    if (!gigToDelete) {
      return new Response("Gig not found", { status: 404 });
    }

    await db.gig.delete({
      where: {
        id: gigToDelete.id,
      },
    });

    return new Response("Gig deleted", { status: 200 });
  } catch (error) {
    console.log("GIG_DELETE_ERROR: ", error);
    return new Response("An error occurred", { status: 500 });
  }
}
