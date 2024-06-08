"use client";

import { lazy } from "react";
import CategorySliderMobile from "./CategorySliderMobile";
import CategorySliderDesktop from "./CategorySliderDesktop";
import { useTranslations } from "next-intl";

const HeroCategorySlider = () => {
  const t = useTranslations("HeroSection.CategoryHero");
  return (
    <section className="min-h[500px] flex max-h-[500px] min-w-[100dvw] max-w-[100dvw] flex-col overflow-hidden px-[24px] py-8 tablet:h-[700px]">
      <span className="flex max-w-[100dvw] px-2 text-3xl font-bold">
        {t("title")}
      </span>

      <div className="flex desktop:hidden">
        <CategorySliderMobile />
      </div>
      <div className="hidden desktop:flex">
        <CategorySliderDesktop />
      </div>
    </section>
  );
};

export default HeroCategorySlider;
