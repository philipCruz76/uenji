import getCurrentUser from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
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
            id: true,
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

    if (user.stripeCustomerId === null) {
      const customer = await stripe.customers.create({
        name: user.name!,
        email: user.email!,
      });

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: customer.id,
        },
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: parseInt(selectedGigPackage[gigPackage].price) / 100,
      payment_method_types: ["card", "paypal"],
      receipt_email: user.email!,
      customer: user.stripeCustomerId!,
      setup_future_usage: "on_session",
      metadata: {
        buyerId: user.id,
        sellerId: gig.user.id,
        gigId: gig.id,
        packageIdx: gigPackage,
        gigDeliveryTime: selectedGigPackage[gigPackage].deliveryTime,
      },
    });

    return new NextResponse(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
    );
  } catch (error) {
    console.log("STRIPE_ERROR: Error creating payment intent", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export { POST };
