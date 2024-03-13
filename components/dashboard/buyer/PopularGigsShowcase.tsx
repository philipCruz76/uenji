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

  return (
    <section className="flex h-full w-full flex-col gap-4 ">
      <h1 className="w-full text-2xl font-semibold">
        Aqui tens os serviços de <i>Programação</i> mais populares
      </h1>

      {/* Popular Gigs Carousel */}

      <Carousel
        className=" max-w-[75dvw]"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {popularGigs
            ? popularGigs.map((gig, index) => (
                <CarouselItem
                  key={`popular-gig-${index}`}
                  className=" pl-4  tablet:basis-1/2 desktop:basis-1/3 "
                >
                  <GigCard gigToShow={gig} index={index} />
                </CarouselItem>
              ))
            : null}
        </CarouselContent>

        <CarouselPrevious className="ml-2" />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default PopularGigsShowcase;
