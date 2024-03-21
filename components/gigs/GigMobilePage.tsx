import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";

import { lazy } from "react";
import GigBasicInfoMobile from "@/components/gigs/GigBasicInfoMobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/Carousel";
import Image from "next/image";
import GigPricingMobile from "./GigPricingMobile";
import getSession from "@/lib/actions/getSession";
import { ExtendedGigInfo } from "@/types/common.types";

const GigSellerInfoMobile = lazy(
  () => import("@/components/gigs/GigSellerInfoMobile"),
);

type GigMobilePageProps = {
  pageGig: ExtendedGigInfo;
};

const GigMobilePage = async ({ pageGig }: GigMobilePageProps) => {
  if (!pageGig) redirect("/");
  const session = await getSession();
  let currentUsername = "";
  if (session !== null) {
    const currentUser = await getCurrentUser();
    currentUsername = currentUser?.username || "";
  }

  const multipleImages = pageGig.images.length > 1;
  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw] max-w-[100dvw] flex-col gap-2">
      {/* Gig Gallery */}

      <Carousel className=" flex items-center justify-center min-h-[200px] min-w-[100dvw]">
        <CarouselContent className="flex h-full min-w-full">
          {multipleImages ? (
            pageGig.images.map((gigImage, index) => (
              <CarouselItem key={`gigImage-${index}`}>
                <Image
                  src={gigImage}
                  alt="Gig Cover Image"
                  height={100}
                  width={100}
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="">
              <Image
                src={pageGig.coverImage!}
                alt="Gig Cover Image"
                height={200}
                width={200}
                className="h-full w-full"
              />
            </CarouselItem>
          )}
        </CarouselContent>
        {multipleImages && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {/* Gig Seller Info */}
      <div className="h-[70px] w-full">
        <GigSellerInfoMobile
          gigSeller={pageGig.user}
          currentUser={currentUsername}
        />
      </div>

      {/* Gig Info */}
      <GigBasicInfoMobile
        gigTitle={pageGig.title}
        gigDescription={pageGig.description}
      />

      {/* Gig Pricing */}
      <div className="max-h-[450px] w-full items-center justify-center border py-[20px] text-center">
        <GigPricingMobile gig={pageGig} />
      </div>
    </section>
  );
};

export default GigMobilePage;
