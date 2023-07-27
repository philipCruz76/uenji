'use client'
import Image from 'next/image';
import { useSwiper } from 'swiper/react';

const NextButton = () => {
    const swiper = useSwiper();
  return (
    <button className=" absolute top-1/2 z-10  -translate-x-0 translate-y-[-50%] right-0 items-center justify-end">
            <Image alt="right-arrow" src="/icons/arrow-circle-right.svg" className="flex bg-white rounded-full shadow focus:outline-none" width={50} height={50}   onClick={() => swiper.slideNext(350)}/>
          </button>
  )
}

export default NextButton