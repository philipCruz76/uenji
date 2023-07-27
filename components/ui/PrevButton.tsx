'use client'
import Image from 'next/image';
import { useSwiper } from 'swiper/react';

const PrevButton = () => {
    const swiper = useSwiper();

    return (
        <button className=" absolute top-1/2 -translate-x-0 translate-y-[-50%] left-0 z-10 p-2 items-start justify-start" >
            <Image alt="left-arrow" src="./icons/arrow-circle-left.svg" className="flex bg-white rounded-full shadow focus:outline-none"  width={48} height={48} onClick={() => swiper.slidePrev(350)} />
        </button>
    )
}

export default PrevButton