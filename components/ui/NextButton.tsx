'use client'
import { useSwiper } from 'swiper/react';

const NextButton = () => {
    const swiper = useSwiper();
  return (
    <button className="flex absolute top-1/2 z-10  right-0 items-center justify-end">
            <img alt="right-arrow" src="/icons/arrow-circle-right.svg" className=" flex w-50 h-50" width={50} height={50}   onClick={() => swiper.slideNext(10)}/>
          </button>
  )
}

export default NextButton