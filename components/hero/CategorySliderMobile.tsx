"use client";
import { catCards } from "@/constants";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";
type CategorySliderMobileProps = {};

const CategorySliderMobile = ({}: CategorySliderMobileProps) => {
  const locale = useLocale();
  return (
    <div className="flex flex-col">
      <motion.div
        id="imageSlider1"
        drag={"x"}
        dragConstraints={{ left: -1420, right: 20 }}
        className=" flex max-w-[80%]  select-none flex-row items-center gap-[4vmin] py-8 "
      >
        {catCards.map((card) => (
          <div className="relative" key={`${card.alt}1`}>
            <Image
              src={card.image}
              alt={card.alt}
              draggable={false}
              width={600}
              height={600}
              className={`flex min-h-[240px] min-w-[160px] rounded-md border object-cover`}
            />
            <span className="absolute left-[10%]  top-[80%] font-sans text-xl font-semibold text-white">
              {locale === "pt" ? card.titlePT : card.titleEN}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategorySliderMobile;
