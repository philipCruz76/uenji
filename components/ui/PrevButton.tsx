"use client";
import { ArrowLeft } from "lucide-react";
import { useSwiper } from "swiper/react";

const PrevButton = () => {
  const swiper = useSwiper();

  return (
    <button className="absolute left-0 top-1/2 z-10 h-10 w-10 -translate-x-0 translate-y-[-50%] items-end justify-center rounded-full bg-white">
      <ArrowLeft className="h-8 w-8" onClick={() => swiper.slidePrev(350)} />
    </button>
  );
};

export default PrevButton;
