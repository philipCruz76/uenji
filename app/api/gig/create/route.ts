import getCurrentUser from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();

    const { gigTitle, gigCategory, gigSearchTags } = body;

    await db.gig.create({
      data: {
        title: gigTitle.toLowerCase(),
        features: gigSearchTags,
        userId: currentUser.id,
        category: gigCategory,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("Gig Creation error: ", error);
    return NextResponse.error();
  }
}
