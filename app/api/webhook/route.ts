import { headers } from "next/headers";
import { NextResponse } from "next/server";

import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;

      const paymentIntent = (await stripe.paymentIntents.retrieve(
        charge.payment_intent as string,
      )) as Stripe.PaymentIntent;

      if (
        !charge.metadata?.sellerId ||
        !charge.metadata?.buyerId ||
        !charge.metadata?.gigId ||
        !charge.metadata?.packageIdx ||
        !charge.metadata?.gigDeliveryTime
      ) {
        throw new Error("Required user information missing!");
      }

      const buyer = await db.user.findUnique({
        where: {
          id: charge.metadata.buyerId,
        },
      });

      const gig = await db.gig.findUnique({
        where: {
          id: charge.metadata.gigId,
        },
      });

      if (!buyer) {
        return new NextResponse("User not found", { status: 404 });
      }

      if (!gig) {
        return new NextResponse("Gig not found", { status: 404 });
      }

      if (charge.status === "succeeded") {
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
          deliveryTime.getDate() + parseInt(charge.metadata.gigDeliveryTime),
        );

        // MAJOR BUG: order is being created somewhere else in the code, resulting in duplicate orders when this code is uncommented. Once the bug is fixed, uncomment this code.
        await db.order.create({
          data: {
            buyerId: charge.metadata.buyerId,
            sellerId: charge.metadata.sellerId,
            userIds: [charge.metadata.buyerId, charge.metadata.sellerId],
            price: paymentIntent.amount * 100,
            gigId: gig.id,
            isCompleted: false,
            title: gig.title,
            gigPackageIdx: parseInt(charge.metadata.packageIdx),
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
