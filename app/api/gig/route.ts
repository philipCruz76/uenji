import getCurrentUser from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.error();
    }
    const userGigs = await db.gig.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(userGigs);
  } catch (error) {
    console.log("GIG_LOOKUP_ERROR: ", error);
    return NextResponse.error();
  }
}
