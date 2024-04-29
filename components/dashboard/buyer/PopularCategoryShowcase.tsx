"use client"
import { CategoryDesciptionsEN, CategoryDesciptionsPT } from "@/constants";
import chooseCategoryAnimation from "@/lib/chooseCategoryAnimation";
import Lottie from "lottie-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

type PopularCategoryShowcaseProps = {};

const PopularCategoryShowcase =  ({}: PopularCategoryShowcaseProps) => {
  const locale =  useLocale();
  const popularCategoriesText = useTranslations("Dashboard.buyer")
  const CategoryDescriptions =
    locale === "pt" ? CategoryDesciptionsPT : CategoryDesciptionsEN;

  const popularCategories = CategoryDescriptions.filter(
    (category) =>
      category.categoryName === "programacao" ||
      category.categoryName === "fotografia" ||
      category.categoryName === "negocios" ||
      category.categoryName === "design",
  );
  return (
    <section className="h-full w-full">
      <h1 className="text-2xl font-semibold">
        {popularCategoriesText("popularCategories")}
      </h1>

      <ul className=" grid w-full grid-cols-5 grid-rows-1 gap-6 py-8">
        {popularCategories.map((category) => {
          const freelancerAnimation = chooseCategoryAnimation(
            category.categoryName,
          );
          return (
            <li key={category.categoryName}>
              <Link
                href={`/categorias/${category.categoryName}`}
                className="group flex flex-col items-center justify-center text-xl font-bold"
              >
                <Lottie
                  animationData={freelancerAnimation}
                  loop={true}
                  width={100}
                  height={100}
                  className="max-h-[100] max-w-[100] object-fill"
                />

                <span className="flex flex-row transition duration-200 ease-in-out group-hover:scale-105">
                  {category.categoryTitle}
                </span>
                <div className="block h-[3px] w-[80px]  bg-transparent transition duration-200 ease-in-out group-hover:scale-x-150  group-hover:bg-current " />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PopularCategoryShowcase;
