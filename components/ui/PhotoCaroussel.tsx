"use client";

import { FC } from "react";
import CategoryCard from "../categories/CategoryCard";
import { catCards } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";

import 'swiper/css/bundle';


interface PhotoCarousselProps {
  slidesTOShow: number;
}

const PhotoCaroussel: FC<PhotoCarousselProps> = ({ slidesTOShow }) => {

  return (
    <>

      <div className="flex container items-center justify-center  lg:w-[1200px] desktop:w-[800px] tablet:w-[560px]">
        <Swiper
          slidesPerView={slidesTOShow}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          breakpoints={{
            500: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 220,
            },
            1200: {
              slidesPerView: slidesTOShow,
              spaceBetween: 270,
            },

          }}>

          <div className="flex box-border w-full">
            {catCards.map((card) => (
              <SwiperSlide key={card.alt} className="flex gap-4">
                <CategoryCard key={card.title} title={card.title} description={card.description} image={card.image} alt={card.alt} />
              </SwiperSlide>
            ))}
          </div>

          {/* Swiper Buttons */}
          <div className="flex flex-row">
            <PrevButton />
            <NextButton />
          </div>

        </Swiper>
      </div>
    </>
  );
};

export default PhotoCaroussel;
