'use client'
import { useSwiper } from 'swiper/react';

const PrevButton = () => {
    const swiper = useSwiper();

    return (
        <button className="flex absolute top-1/2 z-10 w-full items-start justify-start" >
            <img alt="left-arrow" src="./icons/arrow-circle-left.svg" className="flex w-50 h-50" onClick={() => swiper.slidePrev(20)} />
        </button>
    )
}

export default PrevButton