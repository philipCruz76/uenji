import getCurrentUser from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { GigPricing } from "@/types/gigWizard.types";
import { NextResponse } from "next/server";

async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const searchParams = new URL(request.url).searchParams;
    const gigID = searchParams.get("gigId");
    const gigPackage = searchParams.get("gigPackage") as number | null;
    if (!gigID || !gigPackage) {
      return new NextResponse(
        "Gig id and/or package not provided in URL. Please try again",
        {
          status: 404,
        },
      );
    }

    const gig = await db.gig.findUnique({
      where: {
        id: gigID,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!gig) {
      return new NextResponse("Gig not found", { status: 404 });
    }

    const selectedGigPackage = JSON.parse(
      gig.packages!,
    ) as GigPricing["packages"];
    const cancellationUrl = absoluteUrl(
      `/${gig.user.username}/${gig.title.toLowerCase().replace(/ /g, "-")}`,
    );
    const successUrl = absoluteUrl("/");

    const stripeSession = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      return_url: successUrl,
      payment_method_types: ["card", "paypal"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: user.email!,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: `${selectedGigPackage[gigPackage].title.charAt(0).toUpperCase()}${selectedGigPackage[gigPackage].title.slice(1)}`,
              description: selectedGigPackage[gigPackage].description!,
            },

            unit_amount: parseInt(selectedGigPackage[gigPackage].price) / 10,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        gigId: gig.id,
      },
    });

    return new NextResponse(
      JSON.stringify({ client_secret: stripeSession.client_secret }),
    );
  } catch (error) {
    console.log("STRIPE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export { POST };
