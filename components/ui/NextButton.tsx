"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useSwiper } from "swiper/react";

const NextButton = () => {
  const swiper = useSwiper();
  return (
    <button className="absolute right-0 top-1/2 z-10 h-10 w-10 -translate-x-0 translate-y-[-50%] items-center justify-center rounded-full bg-white">
      <ArrowRight className="h-8 w-8" onClick={() => swiper.slidePrev(350)} />
    </button>
  );
};

export default NextButton;
