"use client";
import { catCards } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

type CategorySliderDesktopProps = {};

const CategorySliderDesktop = ({}: CategorySliderDesktopProps) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const dragConstraintRef = useRef<HTMLDivElement>(null);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const locale = useLocale();

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);
  return (
    <div className="flex flex-col">
      <motion.div
        id="imageSlider1"
        ref={dragConstraintRef}
        drag={"x"}
        dragConstraints={{ left: -900, right: 50 }}
        initial={{ x: -200 }}
        animate={{ x: -(innerWidth + 960) }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className=" flex max-w-[80%]  select-none flex-row items-center gap-[4vmin] py-8 "
      >
        {catCards.map((card) => (
          <motion.div
            key={`${card.alt}1`}
            layoutId={card.titleEN + "-card1"}
            onClick={() =>
              setSelectedCard(locale === "pt" ? card.titlePT : card.titleEN)
            }
            className="relative block min-h-[300px] min-w-[180px] overflow-hidden rounded-md"
          >
            <motion.img
              src={card.image}
              alt={card.alt}
              draggable={false}
              className={`max-h-[300px] min-h-[300px] min-w-[250px] rounded-md transition-transform`}
            />
            <span className="absolute left-[10%]  top-[80%] font-sans text-xl font-semibold text-white">
              {locale === "pt" ? card.titlePT : card.titleEN}
            </span>
          </motion.div>
        ))}
        {catCards.map((card) => (
          <motion.div
            key={`${card.alt}2`}
            layoutId={card.titleEN + "-card2"}
            onClick={() =>
              setSelectedCard(locale === "pt" ? card.titlePT : card.titleEN)
            }
            className=" relative block min-h-[300px] min-w-[180px] overflow-hidden rounded-md"
          >
            <motion.img
              src={card.image}
              alt={card.alt}
              draggable={false}
              className={`max-h-[300px] min-h-[300px] min-w-[250px] rounded-md transition-transform`}
            />
            <span className="absolute left-[10%]  top-[80%] font-sans text-xl font-semibold text-white">
              {locale === "pt" ? card.titlePT : card.titleEN}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            layoutId={selectedCard}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedCard(null)}
          >
            <img
              src={
                catCards.find((card) =>
                  locale === "pt"
                    ? card.titlePT
                    : card.titleEN === selectedCard,
                )?.image
              }
              className={`min-h-[56vmin] min-w-[40vmin]  object-cover object-[100%,50%] transition-transform `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySliderDesktop;
