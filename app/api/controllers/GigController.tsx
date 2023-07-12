import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import getCurrentUser from "@/lib/actions/getCurrentUser";


export const createGig = async (req: Request, res: Request) => {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  const { title, description, price, category, deliveryTime, shortTitle } = body;

  if (!currentUser) {
    return NextResponse.redirect('/login');
  }
  if (!currentUser.isSeller) {
    return new NextResponse('Only sellers can create gigs', { status: 403 })
  }

  const newGig = await db.gig.create({
    data: {
      title,
      description,
      price,
      category,
      deliveryTime,
      shortTitle,
      user: {
        connect: {
          id: currentUser.id

        }
      }
    }
  })


}