import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try{
        const body = await request.json();

        const newGig = await db.gig.create({
          data: {
            title: body.title as string,
            features: body.features as string[],
            userId: body.userId as string,
            category: body.category as string,
          }

        })
    }catch(error){
        console.log("Gig Creation error: ", error);
        return NextResponse.error();
    }
}