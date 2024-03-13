import getCurrentUser from "@/lib/actions/getCurrentUser";
import getGigByTitle from "@/lib/actions/gigs/getGigByTitle";
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

const GigSellerInfoMobile = lazy(
  () => import("@/components/gigs/GigSellerInfoMobile"),
);

type GigMobilePageProps = {
  pageGig: Awaited<ReturnType<typeof getGigByTitle>>;
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
      <div className=" flex h-[200px] w-full items-center justify-center border text-center">
        <Carousel>
          <CarouselContent>
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
              <CarouselItem>
                <Image
                  src={pageGig.coverImage!}
                  alt="Gig Cover Image"
                  height={200}
                  width={200}
                  className="h-full w-[200px]"
                />
              </CarouselItem>
            )}
          </CarouselContent>
          {multipleImages ? (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          ) : null}
        </Carousel>
      </div>

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
      <div className="max-h-[450px] w-full items-center justify-center border text-center py-[20px]">
        <GigPricingMobile gig={pageGig} />
      </div>
    </section>
  );
};

export default GigMobilePage;