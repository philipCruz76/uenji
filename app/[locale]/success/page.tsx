import SuccessPage from "@/components/checkout/SuccessPage";
import orderPlacementSuccess from "@/lib/actions/orders/orderPlacementSucces";
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

  const purchase = await orderPlacementSuccess(searchParams.payment_intent);
  if (!purchase) redirect("/");

  return (
    <section className="flex max-h-[25px] min-h-[100dvh] min-w-[100dvw] flex-col items-center justify-center gap-6 p-6">
      <SuccessPage
        pruchasedPackage={purchase.package}
        purchasedGig={purchase.gig}
      />
    </section>
  );
}
