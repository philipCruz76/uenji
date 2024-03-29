import SuccessPage from "@/components/checkout/SuccessPage";
import getGigById from "@/lib/actions/gigs/getGigById";
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
      const paymentIntent = await stripe.paymentIntents.retrieve(
        searchParams.payment_intent,
      );
      console.log("PAYMENT_INTENT_RETRIEVED");
      const gigId = paymentIntent.metadata.gigId;
      const packageIndex = parseInt(paymentIntent.metadata.packageIdx);

      const selectedGig = await getGigById(gigId);

      if (!selectedGig || !selectedGig.packages) redirect("/");

      const parsedPackage = JSON.parse(
        selectedGig.packages,
      ) as GigPricing["packages"];
      return { package: parsedPackage[packageIndex], gig: selectedGig };
    } catch (error) {
      console.error(error);
    }
  };
  const purchase = await paymentInt();
  if (!purchase) redirect("/");

  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw] flex-col items-center justify-center gap-6 p-6">
      <SuccessPage
        pruchasedPackage={purchase.package}
        purchasedGig={purchase.gig}
      />
    </section>
  );
}
