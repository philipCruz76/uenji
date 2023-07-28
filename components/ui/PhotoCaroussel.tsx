"use client";

import { FC } from "react";
import CategoryCard from "../categories/CategoryCard";
import { catCards } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";

import "swiper/css/bundle";

interface PhotoCarousselProps {
  slidesTOShow: number;
}

const PhotoCaroussel: FC<PhotoCarousselProps> = ({ slidesTOShow }) => {
  return (
    <>
      <Swiper
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          900: {
            slidesPerView: slidesTOShow,
            spaceBetween: 200,
          },
        }}
        className="flex max-w-[1200px] relative w-full mx-auto my-8 items-center justify-start"
      >
        {catCards.map((card) => (
          <SwiperSlide key={card.alt}>
            <CategoryCard
              key={card.title}
              title={card.title}
              description={card.description}
              image={card.image}
              alt={card.alt}
            />
          </SwiperSlide>
        ))}

        {/* Swiper Buttons */}
        <div className="flex flex-row">
          <PrevButton />
          <NextButton />
        </div>
      </Swiper>
    </>
  );
};

export default PhotoCaroussel;
