"use client";

import { catCards } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import PrevButton from "@/components/ui/PrevButton";
import NextButton from "@/components/ui/NextButton";
import { Autoplay } from "swiper/modules";
import CategoryCard from "@/components/categories/CategoryCard";
import MobileCategoryCard from "@/components/categories/MobileCategoryCard";
import "swiper/css/bundle";

type PhotoCarousselProps = {
  slidesTOShow: number;
};

const PhotoCaroussel = ({ slidesTOShow }: PhotoCarousselProps) => {
  return (
    <Swiper
      slidesPerView={1.8}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      loop={true}
      breakpoints={{
        600: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        750: {
          slidesPerView: 3,
          spaceBetween: 70,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 180,
        },
        1100: {
          slidesPerView: slidesTOShow,
          spaceBetween: 200,
        },
      }}
      className="relative mx-auto my-8 flex w-full max-w-[1200px] items-center justify-center"
    >
      {catCards.map((card) => (
        <SwiperSlide key={card.alt} className="w-full">
          <div className="hidden w-fit tablet:flex">
            <CategoryCard
              key={card.title}
              title={card.title}
              description={card.description}
              image={card.image}
              href={card.href}
              alt={card.alt}
            />
          </div>
          <div className="flex w-fit tablet:hidden">
            <MobileCategoryCard
              key={card.title}
              title={card.title}
              description={card.description}
              image={card.image}
              href={card.href}
              alt={card.alt}
            />
          </div>
        </SwiperSlide>
      ))}

      {/* Swiper Buttons */}
      <div className="hidden flex-row tablet:flex">
        <PrevButton />
        <NextButton />
      </div>
    </Swiper>
  );
};

export default PhotoCaroussel;
