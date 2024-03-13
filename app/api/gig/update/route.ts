import getCurrentUserWithExtraInfo from "@/lib/actions/getCurrentUserWithExtraInfo";
import db from "@/lib/db";
import {
  GigDescription,
  GigGallery,
  GigPricing,
} from "@/types/gigWizard.types";
import { revalidatePath } from "next/cache";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUserWithExtraInfo();

    const gigName = request.nextUrl.searchParams
      .get("gigName")
      ?.replace(/-/g, " ");

    const updateType = request.nextUrl.searchParams.get("updateType");

    if (!currentUser || !gigName || !updateType) {
      throw new Error("Invalid user|gigName|updateType");
    }

    const desiredGig = currentUser.Gig.find((gig) => gig.title === gigName);
    if (!desiredGig) {
      return NextResponse.error();
    }
    const body = await request.json();

    switch (updateType) {
      case "overview": {
        const { gigTitle, gigCategory, gigSearchTags } = body;
        await db.gig.update({
          where: {
            id: desiredGig.id,
          },
          data: {
            title: gigTitle.toLowerCase(),
            features: gigSearchTags,
            category: gigCategory,
          },
        });
        break;
      }
      case "pricing": {
        const { packages }: GigPricing = body;

        await db.gig.update({
          where: {
            id: desiredGig.id,
          },
          data: {
            packages: JSON.stringify(packages),
          },
        });
        break;
      }
      case "description": {
        const { description, faqs }: GigDescription = body;

        await db.gig.update({
          where: {
            id: desiredGig.id,
          },
          data: {
            description,
            faq: JSON.stringify(faqs),
          },
        });
        break;
      }
      case "gallery": {
        const { gigImages, gigDocuments }: GigGallery = body;

        await db.gig.update({
          where: {
            id: desiredGig.id,
          },
          data: {
            documents: gigDocuments,
            images: gigImages,
            coverImage: gigImages[0],
          },
        });
        break;
      }
      case "publish": {
        const { publish } = body;
        await db.gig.update({
          where: {
            id: desiredGig.id,
          },
          data: {
            published: publish,
          },
        });
        break;
      }
      default:
        return NextResponse.error();
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("Gig Creation error: ", error);
    return NextResponse.error();
  }
}
