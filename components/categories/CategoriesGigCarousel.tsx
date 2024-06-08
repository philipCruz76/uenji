import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import GigCard from "@/components/gigs/GigCard";
import { UserGigs } from "@/types/common.types";

type CategoriesGigCarouselProps = {
  categoryGigs: UserGigs;
};

const CategoriesGigCarousel = ({
  categoryGigs,
}: CategoriesGigCarouselProps) => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {categoryGigs
          ? categoryGigs.map((gig, index) => (
              <CarouselItem
                key={`popular-gig-${index}`}
                className="ml-2 py-6 tablet:basis-1/2 desktop:basis-1/4"
              >
                <GigCard gigToShow={gig} index={index} />
              </CarouselItem>
            ))
          : null}
      </CarouselContent>

      <CarouselPrevious className="ml-2" />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoriesGigCarousel;
