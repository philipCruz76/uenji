"use server";

import Payment from "@/components/checkout/Payment";
import getGigById from "@/lib/actions/gigs/getGigById";
import { GigPricing } from "@/types/gigWizard.types";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
    <section className="flex min-h-[100dvh] min-w-[100dvw] max-w-[100dvw] max-h-[100dvh] desktop:flex-row flex-col items-start justify-start gap-2 bg-[#f8f9fa] p-[24px] overflow-hidden ">
      <div className="desktop:w-[50dvw] desktop:h-[100dvh] w-[100dvw] min-h-[20dvh]">
        <h1 className="text-2xl font-bold">Checkout </h1>
        <h3 className=" font-mono text-xl font-semibold">
          {parsedPackage[packageIndex].title}
        </h3>
        <h3 className="font-mono font-bold text-3xl">{parsedPackage[packageIndex].price}.00 AOA</h3>
      </div>

      <div className="desktop:w-[50dvw] desktop:h-[100dvh] max-w-[100dvw] tablet:w-[70dvw] w-full  min-h-[80dvh] ">
        <Payment gigId={gigId} gigPackage={parseInt(gigPackage)} />
      </div>
    </section>
  );
}
