import SuccessPage from "@/components/checkout/SuccessPage";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getGigById from "@/lib/actions/gigs/getGigById";
import { sendOrderPlacementEmail } from "@/lib/actions/sendOrderPlacementEmail";
import { stripe } from "@/lib/stripe";
import { GigPricing } from "@/types/gigWizard.types";
import { redirect } from "next/navigation";
type pageProps = {
  searchParams: {
    payment_intent: string;
  };
};

export default async function successPage({ searchParams }: pageProps) {
  if (!searchParams.payment_intent) {
    redirect("/");
  }

  const paymentInt = async () => {
    try {
      const currentUser = await getCurrentUser();
      const paymentIntent = await stripe.paymentIntents.retrieve(
        searchParams.payment_intent,
      );
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
        deliveryTime.getDate() +
          parseInt(paymentIntent.metadata.gigDeliveryTime),
      );

      await sendOrderPlacementEmail(
        currentUser?.email!,
        selectedGig.title,
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
  };
  const purchase = await paymentInt();
  if (!purchase) redirect("/");

  return (
    <section className="flex max-h-[25px] min-h-[100dvh]  min-w-[100dvw] flex-col items-center justify-center gap-6 p-6">
      <SuccessPage
        pruchasedPackage={purchase.package}
        purchasedGig={purchase.gig}
      />
    </section>
  );
}
