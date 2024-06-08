"use client";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
const HeroEyeCatch = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const eyeCatchText = useTranslations("HeroSection.CTA");

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  const transition = {
    duration: 1,
    delay: 0.5,
  };

  useEffect(() => {
    if (isInView) {
      controls.start(variants.visible);
    }
  }, [isInView]);
  return (
    <section className="grip-rows-2 grid h-full max-w-full rounded-md border bg-[#f8f9fa] px-[20px] py-8 tablet:py-14 desktop:grid-cols-2 desktop:py-24">
      <div ref={ref} className="flex flex-wrap items-center text-[#000000]">
        <div className="flex flex-col">
          {/*Title*/}
          <motion.h2
            initial={variants.hidden}
            animate={controls}
            transition={transition}
            className="flex text-2xl font-bold tablet:text-3xl"
          >
            {eyeCatchText("titlePrefix")} <br /> {eyeCatchText("titleSuffix")}
          </motion.h2>

          {/* Selling Proposition*/}
          <ul className="flex max-w-[100dvw] flex-row flex-wrap items-start justify-start gap-4 py-6 pr-6 text-start">
            <motion.li
              initial={variants.hidden}
              animate={controls}
              transition={{ duration: 0.75, delay: 0.75 }}
            >
              <h6 className="flex flex-row gap-2 text-base font-semibold tablet:text-lg">
                <span className="h-[24px] w-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                {eyeCatchText("tagline1.title")}
              </h6>
              <span className="text-base text-[#0b4141] tablet:text-lg">
                {eyeCatchText("tagline1.text")}
              </span>
            </motion.li>

            <motion.li
              initial={variants.hidden}
              animate={controls}
              transition={{ duration: 0.75, delay: 1 }}
            >
              <h6 className="flex flex-row gap-2 text-base font-semibold tablet:text-lg">
                <span className="h-[24px] w-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                {eyeCatchText("tagline2.title")}
              </h6>
              <span className="text-base text-[#0b4141] tablet:text-lg">
                {eyeCatchText("tagline2.text")}
              </span>
            </motion.li>

            <motion.li
              initial={variants.hidden}
              animate={controls}
              transition={{ duration: 0.75, delay: 1.25 }}
            >
              <h6 className="flex flex-row gap-2 text-base font-semibold tablet:text-lg">
                <span className="h-[24px] w-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                {eyeCatchText("tagline3.title")}
              </h6>
              <span className="text-base text-[#0b4141] tablet:text-lg">
                {eyeCatchText("tagline1.text")}
              </span>
            </motion.li>
          </ul>
        </div>
      </div>

      {/* Demo Video*/}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 1.25, delay: 1.75 }}
        className="box-border flex min-w-full"
      >
        <video controls muted className="box-content flex min-w-full">
          <source
            src="https://res.cloudinary.com/dqe71igxe/video/upload/f_auto:video,q_auto/v1/videos/WorkingStockVideo"
            type="video/mp4"
          />
        </video>
      </motion.div>
    </section>
  );
};

export default HeroEyeCatch;
