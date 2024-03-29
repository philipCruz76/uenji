"use server";

import Payment from "@/components/checkout/Payment";
import getGigById from "@/lib/actions/gigs/getGigById";
import { GigPricing } from "@/types/gigWizard.types";
import { redirect } from "next/navigation";

type pageProps = {
  searchParams: {
    gigId: string;
    gigPackage: string;
  };
};

export default async function CheckoutPage({ searchParams }: pageProps) {
  const { gigId, gigPackage } = searchParams;
  const packageIndex = parseInt(gigPackage);
  const selectedGig = await getGigById(gigId);

  if (!selectedGig || !selectedGig.packages) redirect("/");

  const parsedPackage = JSON.parse(
    selectedGig.packages,
  ) as GigPricing["packages"];

  return (
    <section className="flex max-h-[100dvh] min-h-[100dvh] min-w-[100dvw] max-w-[100dvw] flex-col items-start justify-start gap-2 overflow-hidden bg-[#f8f9fa] p-[24px] desktop:flex-row ">
      <div className="min-h-[20dvh] w-[100dvw] desktop:h-[100dvh] desktop:w-[50dvw]">
        <h1 className="text-2xl font-bold">Checkout </h1>
        <h3 className=" font-mono text-xl font-semibold">
          {parsedPackage[packageIndex].title}
        </h3>
        <h3 className="font-mono text-3xl font-bold">
          {parsedPackage[packageIndex].price}.00 AOA
        </h3>
      </div>

      <div className="min-h-[80dvh] w-full max-w-[100dvw] tablet:w-[70dvw] desktop:h-[100dvh]  desktop:w-[50dvw] ">
        <Payment gigId={gigId} gigPackage={parseInt(gigPackage)} />
      </div>
    </section>
  );
}
