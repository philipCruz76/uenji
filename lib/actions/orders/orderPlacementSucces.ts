"use server";

import { GigPricing } from "@/types/gigWizard.types";
import { sendOrderPlacementEmail } from "../sendOrderPlacementEmail";
import { redirect } from "next/navigation";
import getGigById from "../gigs/getGigById";
import { stripe } from "@/lib/stripe";

export default async function orderPlacementSuccess(payment_intent: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    console.log("PAYMENT_INTENT_RETRIEVED");
    const gigId = paymentIntent.metadata.gigId;
    const packageIndex = parseInt(paymentIntent.metadata.packageIdx);

    const selectedGig = await getGigById(gigId);

    if (!selectedGig || !selectedGig.packages) redirect("/");
    const orderTotal = paymentIntent.amount * 100;
    const orderPrice = orderTotal - orderTotal * 0.2;
    const platformFee = orderTotal * 0.2;
    const parsedPackage = JSON.parse(
      selectedGig.packages,
    ) as GigPricing["packages"];
    let deliveryTime = new Date();
    deliveryTime.setDate(
      deliveryTime.getDate() + parseInt(paymentIntent.metadata.gigDeliveryTime),
    );

    await sendOrderPlacementEmail(
      paymentIntent.receipt_email!,
      selectedGig.title,
      selectedGig.coverImage!,
      parsedPackage[packageIndex].title,
      deliveryTime.toLocaleString(),
      orderPrice,
      platformFee,
      orderTotal,
    );
    return { package: parsedPackage[packageIndex], gig: selectedGig };
  } catch (error) {
    console.error(error);
  }
}
