import { headers } from "next/headers";
import { NextResponse } from "next/server";

import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    const session = event.data.object as Stripe.Checkout.Session;

    if (
      event.type === "checkout.session.completed" ||
      event.type === "charge.succeeded"
    ) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string,
      );

      if (
        !session?.metadata?.sellerId ||
        !session?.metadata?.buyerId ||
        !session?.metadata?.gigId ||
        !session?.metadata?.packageIdx ||
        !session?.metadata?.gigDeliveryTime
      ) {
        throw new Error("Required user information missing!");
      }

      const buyer = await db.user.findUnique({
        where: {
          id: session.metadata.buyerId,
        },
      });

      const gig = await db.gig.findUnique({
        where: {
          id: session.metadata.gigId,
        },
      });

      if (!buyer) {
        return new NextResponse("User not found", { status: 404 });
      }

      if (!gig) {
        return new NextResponse("Gig not found", { status: 404 });
      }

      if (paymentIntent.status === "succeeded") {
        if (!buyer.stripeCustomerId) {
          await db.user.update({
            where: {
              id: buyer.id,
            },
            data: {
              stripeCustomerId: paymentIntent.customer?.toString(),
            },
          });
        }
        let deliveryTime = new Date(Date.now());

        deliveryTime.setDate(
          deliveryTime.getDate() + parseInt(session.metadata.gigDeliveryTime),
        );

        await db.order.create({
          data: {
            buyerId: session.metadata.buyerId,
            sellerId: session.metadata.sellerId,
            userIds: [session.metadata.buyerId, session.metadata.sellerId],
            price: paymentIntent.amount * 100,
            gigId: gig.id,
            isCompleted: false,
            title: gig.title,
            gigPackageIdx: parseInt(session.metadata.packageIdx),
            gigDeliveryTime: deliveryTime,
            paymentIntent: paymentIntent.id,
            status: "active",
          },
        });
      }
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error: any) {
    console.error("Webhook Error", error.message);
    return new NextResponse(`Webhook Error ${error.message}`, { status: 400 });
  }
}
