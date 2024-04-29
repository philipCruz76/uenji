import GigCard from "@/components/gigs/GigCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import getPopularGigs from "@/lib/actions/gigs/getPopularGigs";

type PopularGigsShowcaseProps = {};

const PopularGigsShowcase = async ({}: PopularGigsShowcaseProps) => {
  const popularGigs = await getPopularGigs();
  const popularPhotoGigs = await getPopularGigs("fotografia");
  return (
    <section className="flex h-full w-full flex-col gap-4 ">
      {/* Programming Gigs Showcase */}
      <h1 className="w-full text-2xl font-semibold">
        Aqui tens os serviços de <i>Programação</i> mais populares
      </h1>

      {/* Popular Gigs Carousel */}
      <div className="px-6 py-6">
        <Carousel
          className="max-w-[90dvw]"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="px-4 py-4 gap-4">
            {popularGigs
              ? popularGigs.map((gig, index) => (
                  <CarouselItem
                    key={`popular-gig-${index}`}
                    className=" pl-4 tablet:basis-1/2 desktop:basis-1/3 "
                  >
                    <GigCard gigToShow={gig} index={index} />
                  </CarouselItem>
                ))
              : null}
          </CarouselContent>

          <CarouselPrevious className="ml-2" />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Photography Gigs Showcase */}
      <h1 className="w-full text-2xl font-semibold">
        Aqui tens os serviços de <i>Fotografia</i> mais populares
      </h1>

      {/* Popular Gigs Carousel */}
      <div className="px-6 py-6">
        <Carousel
          className="max-w-[90dvw]"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="px-4 py-4 gap-4">
            {popularPhotoGigs
              ? popularPhotoGigs.map((gig, index) => (
                  <CarouselItem
                    key={`popular-gig-${index}`}
                    className="pl-4 tablet:basis-1/2 desktop:basis-1/3 "
                  >
                    <GigCard gigToShow={gig} index={index} />
                  </CarouselItem>
                ))
              : null}
          </CarouselContent>

          <CarouselPrevious className="ml-2" />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PopularGigsShowcase;
