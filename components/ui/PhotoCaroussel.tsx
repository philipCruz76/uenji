"use client";

import { FC } from "react";
import CategoryCard from "../categories/CategoryCard";
import { catCards } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";

import "swiper/css/bundle";
import MobileCategoryCard from "../categories/MobileCategoryCard";

interface PhotoCarousselProps {
  slidesTOShow: number;
}

const PhotoCaroussel: FC<PhotoCarousselProps> = ({ slidesTOShow }) => {
  return (
    <>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={10}
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
        className="flex max-w-[1200px] relative w-full mx-auto my-8 items-center justify-center"
      >
        {catCards.map((card) => (
          <SwiperSlide key={card.alt} className="w-screen">
            <div className="tablet:flex hidden">
            <CategoryCard
              key={card.title}
              title={card.title}
              description={card.description}
              image={card.image}
              alt={card.alt}
            />
            </div>
            <div className="tablet:hidden flex">
              <MobileCategoryCard
                key={card.title}
                title={card.title}
                description={card.description}
                image={card.image}
                alt={card.alt}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Swiper Buttons */}
        <div className="tablet:flex hidden flex-row">
          <PrevButton />
          <NextButton />
        </div>
      </Swiper>
    </>
  );
};

export default PhotoCaroussel;
