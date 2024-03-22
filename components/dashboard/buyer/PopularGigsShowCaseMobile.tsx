import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import getPopularGigs from "@/lib/actions/gigs/getPopularGigs";
import { GigPricing } from "@/types/gigWizard.types";
import Image from "next/image";
import Link from "next/link";

type PopularGigsShowCaseMobileProps = {};

async function PopularGigsShowCaseMobile({}: PopularGigsShowCaseMobileProps) {
  const gigs = await getPopularGigs();
  if (!gigs) return null;
  return (
    <>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {gigs
            ? gigs.map((gig, index) => {
                const gigPackage = JSON.parse(
                  gig.packages!,
                ) as GigPricing["packages"];
                return (
                  <CarouselItem
                    key={`popular-gig-${index}`}
                    className="ml-2  basis-[75%]"
                  >
                    <Link
                      href={`/${gig.user.username}/${gig.title.replace(
                        /\s/g,
                        "-",
                      )}`}
                    >
                      <Card className="flex h-[240px] w-[250px] flex-col rounded-md border bg-[#f8f9fa] font-mono shadow-md">
                        <CardTitle className="max-h-[50%] min-w-full border-b">
                          <Image
                            src={gig.coverImage!}
                            alt={`${gig.title}`}
                            width={250}
                            height={120}
                            className="h-full w-full rounded-se-md rounded-ss-md bg-white"
                          />
                        </CardTitle>
                        <CardContent className="max-h-[50%] min-w-full p-[4px]">
                          <div className="flex h-full w-full flex-col ">
                            <div className="flex w-full flex-row items-center justify-start gap-2">
                              <Image
                                src={gig.user.image!}
                                alt={`${gig.user.username} Profile picture`}
                                width={30}
                                height={30}
                                className="max-h-[30px] min-h-[30px] max-w-[30px] rounded-full border bg-white"
                              />
                              <span className=" text-sm font-semibold">
                                {!gig.user.displayName
                                  ? gig.user.username
                                  : gig.user.displayName}
                              </span>
                            </div>
                            <div className="h-full w-full items-start justify-between p-2">
                              <span className="flex h-full flex-wrap font-sans text-xs font-semibold">
                                {gig.title.charAt(0).toUpperCase() +
                                  gig.title.slice(1)}
                              </span>

                              <span className=" flex items-end  text-sm font-semibold">
                                {gigPackage[0].price}.00 AOA
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                );
              })
            : null}
        </CarouselContent>
      </Carousel>
    </>
  );
}

export default PopularGigsShowCaseMobile;
